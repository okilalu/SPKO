const { validate, customer } = require("../models");

module.exports = {
  async validateDoc(req, res) {
    const id = req.params.id;
    try {
      let { behavior, attendance, teamwork, fileCompleteness } = req.body;

      const validOptions = [
        "excellent",
        "good",
        "ordinary",
        "not good",
        "very bad",
      ];
      const validFileOptions = ["complate", "incomplate"];

      if (!fileCompleteness) {
        fileCompleteness = "complate";
      }
      console.log("behavior", behavior);
      console.log("attendance", attendance);
      console.log("teamwork", teamwork);
      console.log("fileCompleteness", fileCompleteness);

      if (!validOptions.includes(behavior)) {
        return res.status(400).send({
          status: true,
          message: "Must be choose one of their option behavior",
          data: { validate: null },
        });
      }
      if (!validOptions.includes(attendance)) {
        return res.status(400).send({
          status: true,
          message: "Must be choose one of their option attendance",
          data: { validate: null },
        });
      }
      if (!validOptions.includes(teamwork)) {
        return res.status(400).send({
          status: true,
          message: "Must be choose one of their option teamwork",
          data: { validate: null },
        });
      }
      if (!validFileOptions.includes(fileCompleteness)) {
        return res.status(400).send({
          status: true,
          message: "Must be choose one of their option file",
          data: { validate: null },
        });
      }
      let behaviorScore =
        behavior === "excellent"
          ? 5
          : behavior === "good"
          ? 4
          : behavior === "ordinary"
          ? 3
          : behavior === "not good"
          ? 2
          : 1;
      let attendanceScore =
        attendance === "excellent"
          ? 5
          : attendance === "good"
          ? 4
          : attendance === "ordinary"
          ? 3
          : attendance === "not good"
          ? 2
          : 1;
      let teamworkScore =
        teamwork === "excellent"
          ? 5
          : teamwork === "good"
          ? 4
          : teamwork === "ordinary"
          ? 3
          : teamwork === "not good"
          ? 2
          : 1;
      let fileCompletenessScore = fileCompleteness === "complate" ? 5 : 1;

      console.log("behaviorScore :", behaviorScore);
      console.log("attendanceScore :", attendanceScore);
      console.log("teamworkScore :", teamworkScore);
      console.log("fileCompletenessScore :", fileCompletenessScore);

      const totalScore =
        0.3 * behaviorScore +
        0.4 * attendanceScore +
        0.2 * teamworkScore +
        0.1 * fileCompletenessScore;
      console.log("totalScore :", totalScore);

      const validateData = await validate.create({
        behavior,
        attendance,
        teamwork,
        fileCompleteness,
        totalScore,
        customerId: id,
      });
      console.log(validateData);

      // Threshold untuk kelayakan
      const threshold = 3;

      if (!validateData) {
        return res.status(404).send({
          status: false,
          message: "Failed to get validate",
          data: { validate: null },
        });
      }

      if (totalScore <= threshold) {
        await customer.update(
          {
            status: "Document has been rejected by system",
          },
          { where: { id: id } }
        );
        return res.status(200).send({
          status: true,
          message: "Your doc has been rejected",
          data: { validate: validateData },
        });
      } else {
        await customer.update(
          {
            status: "Document has been validate by system",
          },
          { where: { id: id } }
        );
        return res.status(200).send({
          status: true,
          message: "Your doc has been accepted",
          data: { validate: validateData },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { validate: null },
      });
    }
  },
  async list(req, res) {
    try {
      const getValidateData = await validate.findAll();
      if (getValidateData) {
        return res.status(200).send({
          status: true,
          message: "List data document has been validate",
          data: { validate: getValidateData },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Can't find a list data has been validate",
          data: { validate: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { validate: null },
      });
    }
  },
};
