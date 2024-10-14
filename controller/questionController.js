const questionService = require("../services/questionService.js");
const createQuestion = async (req, res) => {
  try {
    const { messages, topicId } = req.body;
    const file = req.file;
    const userId = req.userId?.id;
    //debugging API
    console.log("Message: ", messages);
    console.log("User ID: ", userId);
    console.log("Topic ID: ", topicId);
    console.log("File: ", file);
    if (!messages || !userId || !topicId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const question = await questionService.createQuestion(
      messages,
      file,
      userId,
      topicId
    );
    return res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create question",
      error: error.message,
    });
  }
};
const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages } = req.body;
    const file = req.file;
    const updatedQuestion = await questionService.updatedQuestion(
      id,
      messages,
      file
    );
    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: updatedQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};
const getQuestions = async (req, res) => {
  try {
    const questions = await questionService.getQuestions();
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Error in getQuestions: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};
const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await questionService.getQuestionById(id);
    if (!question) {
      console.log("Question not found");
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Question retrieved successfully",
      data: question,
    });
  } catch (error) {
    console.error("Error in getQuestionById: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve question",
      error: error.message,
    });
  }
};
const getQuestionsByTopicId = async (req, res) => {
  try {
    const { topicId } = req.params;
    const questions = await questionService.getQuestionsByTopicId(topicId);
    res.status(200).json({
      success: true,
      message: "Questions retrieved successfully",
      data: questions,
    });
  } catch (error) {
    console.error("Error in getQuestionsByTopicId: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
      error: error.message,
    });
  }
};
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await questionService.deletedQuestion(id);
    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};
module.exports = {
  createQuestion,
  updateQuestion,
  getQuestionById,
  getQuestionsByTopicId,
  deleteQuestion,
  getQuestions,
};
