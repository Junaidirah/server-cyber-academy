const answerService = require("../services/answerService.js");
const createAnswer = async (req, res) => {
  try {
    const { messages, questionId } = req.body;
    const file = req.file;
    const userId = req.user?.id;
    //untuk debugging API
    console.log("Message: ", messages);
    console.log("User ID: ", userId);
    console.log("Question ID: ", questionId);
    console.log("File: ", file);
    if (!messages || !userId || !questionId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const answer = await answerService.createAnswer(
      messages,
      file,
      userId,
      questionId
    );
    return res.status(201).json({
      success: true,
      message: "Answer created successfully",
      data: answer,
    });
  } catch (error) {
    console.error("Error in createAnswer: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create answer" });
  }
};
const updatedAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;
    const file = req.file;
    const updatedAnswer = await answerService.updatedAnswer(id, messages, file);
    res.status(200).json({
      success: true,
      message: "Answer updated successfully",
      data: updatedAnswer,
    });
  } catch (error) {
    console.error("Error in updatedAnswer: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to update answer",
      error: error.message,
    });
  }
};
const getAnswers = async (req, res) => {
  try {
    const answers = await answerService.getAnswers();
    res.status(200).json({
      success: true,
      message: "Answers retrieved successfully",
      data: answers,
    });
  } catch (error) {
    console.error("Error in getAnswers: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve answers",
      error: error.message,
    });
  }
};
const findAnswerByQuestionId = async (req, res) => {
  try {
    const { questionId } = req.params;
    const answer = await answerService.findAnswerByQuestionId(questionId);
    res.status(200).json({
      success: true,
      message: "Answer retrieved successfully",
      data: answer,
    });
  } catch (error) {
    console.error("Error in findAnswerByQuestionId: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve answer",
      error: error.message,
    });
  }
};

module.exports = {
  createAnswer,
  updatedAnswer,
  getAnswers,
  findAnswerByQuestionId,
};
