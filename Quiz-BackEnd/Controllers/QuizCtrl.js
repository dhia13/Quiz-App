const Speciality = require("../Models/Speciality");
const Faculty = require("../Models/Faculty");
const Emd = require("../Models/Emd");
const Level = require("../Models/Level");
const Quiz = require("../Models/Quiz");
const User = require("../Models/User");

const QuizCtrl = {
  //Get All Data Filled
  GameData: async (req, res) => {
    try {
      const Data = await Speciality.find().populate({
        path: "Faculties",
        populate: {
          path: "Emds",
          model: "Emd",
          populate: {
            path: "Levels",
            model: "Level",
            populate: {
              path: "Quizs",
              model: "Quiz",
            },
          },
        },
      });
      res.status(200).json({ Success: true, Data });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  //specialty controllers
  AddSpeciality: async (req, res) => {
    try {
      const Title = req.body.Title;
      const Image = req.body.Image;
      const Owner = req.user._id;
      const newSpeciality = new Speciality({
        Title,
        Image,
        Owner,
      });
      await newSpeciality.save();
      res
        .status(201)
        .json({ success: true, Msg: "Speciality Added", Title, newSpeciality });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  GetSpeciality: async (req, res) => {
    try {
      const speciality = await Speciality.findById(req.params.id).populate(
        "Owner",
        "username role"
      );
      res
        .status(200)
        .json({ success: true, Msg: "Single Speciality", speciality });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  AllSpecialities: async (req, res) => {
    try {
      const Specialities = await Speciality.find().populate(
        "Owner",
        "username role"
      );
      res
        .status(200)
        .json({ success: true, Msg: "All Speciality", Specialities });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  EditSpeciality: async (req, res) => {
    try {
      const id = req.params.id;
      const specData = await Speciality.findById(id);
      if (
        specData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        await Speciality.findByIdAndUpdate(id, {
          $set: {
            Title: req.body.Title,
            Image: req.body.Image,
          },
        });
        res.status(200).json({ success: true, msg: "Speciality Update" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  DeleteSpeciality: async (req, res) => {
    try {
      const id = req.params.id;
      const SpecialityData = await Speciality.findById(id).populate({
        path: "Faculties",
        populate: {
          path: "Emds",
          model: "Emd",
          select: "_id",
          populate: {
            path: "Levels",
            model: "Level",
            select: "_id",
            populate: {
              path: "Quizs",
              model: "Quiz",
              select: "_id",
            },
          },
        },
      });
      if (
        SpecialityData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        const Faculties = SpecialityData.Faculties;
        for (const faculty of Faculties) {
          for (const emd of faculty.Emds) {
            for (const level of emd.Levels) {
              for (const quiz of level.quizs) {
                await Quiz.findByIdAndRemove(quiz);
              }
              await Level.findByIdAndRemove(level);
            }
            await Emd.findByIdAndRemove(emd);
          }
          await Faculty.findByIdAndRemove(faculty);
        }
        await Speciality.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "Speciality Deleted" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  //faculty controllers
  AddFaculty: async (req, res) => {
    try {
      const Title = req.body.Title;
      const Owner = req.user._id;
      const specialityId = req.body.Speciality;
      const newFaculty = new Faculty({
        Title,
        Speciality: specialityId,
        Owner,
      });
      await newFaculty.save();
      await Speciality.findByIdAndUpdate(
        specialityId,
        {
          $push: { Faculties: newFaculty._id },
        },
        { new: true }
      );
      res
        .status(201)
        .json({ success: true, Msg: "Speciality Added", Title, newFaculty });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  GetFaculty: async (req, res) => {
    try {
      const faculty = await Faculty.findById(req.params.id)
        .populate("Owner", "username role")
        .populate("Speciality", "Title");
      res.status(200).json({ success: true, Msg: "Single faculty", faculty });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  AllFaculties: async (req, res) => {
    try {
      const Faculties = await Faculty.find()
        .populate("Owner", "username role")
        .populate("Speciality", "Title");
      res.status(200).json({ success: true, Msg: "All Speciality", Faculties });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  EditFaculty: async (req, res) => {
    try {
      const id = req.params.id;
      const facData = await Faculty.findById(id);
      if (
        facData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        await Faculty.findByIdAndUpdate(id, {
          $set: {
            Title: req.body.Title,
          },
        });
        res.status(200).json({ success: true, msg: "Faculty Update" });
      }
      res.status(401).json({ success: false, Msg: "not authorized" });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  DeleteFaculty: async (req, res) => {
    try {
      const id = req.params.id;
      const FacultyData = await Faculty.findById(id).populate({
        path: "Emds",
        populate: {
          path: "Levels",
          model: "Level",
          select: "_id",
          populate: {
            path: "Quizs",
            model: "Quiz",
            select: "_id",
          },
        },
      });
      if (
        FacultyData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        const Emds = FacultyData.Emds;
        for (const emd of Emds) {
          for (const level of emd.Levels) {
            for (const quiz of level.Quizs) {
              await Quiz.findByIdAndRemove(quiz);
            }
            await Level.findByIdAndRemove(level);
          }
          await Emd.findByIdAndRemove(emd);
        }
        await Speciality.findByIdAndUpdate(FacultyData.Speciality, {
          $pull: { Faculties: id },
        });
        await Faculty.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "Faculty Deleted" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  // emd controllers
  AddEmd: async (req, res) => {
    try {
      const Title = req.body.Title;
      const Owner = req.user._id;
      const facultyId = req.body.Faculty;
      const newEmd = new Emd({
        Title,
        Faculty: facultyId,
        Owner,
      });
      await newEmd.save();
      await Faculty.findByIdAndUpdate(
        facultyId,
        {
          $push: { Emds: newEmd._id },
        },
        { new: true }
      );
      res.status(201).json({ success: true, Msg: "Emd Added", Title, newEmd });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  GetEmd: async (req, res) => {
    try {
      const emd = await Emd.findById(req.params.id)
        .populate("Faculty")
        .populate("Owner", "username role");
      res.status(200).json({ success: true, Msg: "Single Emd", emd });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  AllEmds: async (req, res) => {
    try {
      const Emds = await Emd.find()
        .populate("Owner", "username role")
        .populate("Faculty", "Title")
        .populate({
          path: "Faculty",
          populate: {
            path: "Speciality",
            select: "Title",
          },
        });
      res.status(200).json({ success: true, Msg: "All Emds", Emds });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  EditEmd: async (req, res) => {
    try {
      const id = req.params.id;
      const emd = await Emd.findById(id).select("Owner");
      if (emd.Owner.equals(req.user._id) || req.user.role === "super_admin") {
        await Emd.findByIdAndUpdate(id, {
          $set: {
            Title: req.body.Title,
          },
        });
        res.status(200).json({ success: true, msg: "Emd Update" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  DeleteEmd: async (req, res) => {
    try {
      const id = req.params.id;
      const emd = await Emd.findById(id).select("Owner");
      if (emd.Owner.equals(req.user._id) || req.user.role === "super_admin") {
        const EmdData = await Emd.findById(id).populate({
          path: "Levels",
          select: "_id",
          populate: {
            path: "Quizs",
            model: "Quiz",
            select: "_id",
          },
        });
        const Levels = EmdData.Levels;
        for (const level of Levels) {
          for (const quiz of level.Quizs) {
            await Quiz.findByIdAndRemove(quiz._id);
          }
          await Level.findByIdAndRemove(level._id);
        }
        await Faculty.findByIdAndUpdate(EmdData.Faculty, {
          $pull: { Emds: EmdData.Faculty },
        });
        await Emd.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "Emd Deleted" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  // levels controllers
  AddLevel: async (req, res) => {
    try {
      const Title = req.body.Title;
      const Owner = req.user._id;
      const emdId = req.body.Emd;
      const newLevel = new Level({
        Title,
        Emd: emdId,
        Owner,
      });
      await newLevel.save();
      await Emd.findByIdAndUpdate(
        emdId,
        {
          $push: { Levels: newLevel._id },
        },
        { new: true }
      );
      res
        .status(201)
        .json({ success: true, Msg: "Level Added", Title, newLevel });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  GetLevel: async (req, res) => {
    try {
      const level = await Level.findById(req.params.id)
        .populate("Emd", "Title")
        .populate("Owner", "username role")
        .populate("Quizs");
      res.status(200).json({ success: true, Msg: "Single Level", level });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  AllLevels: async (req, res) => {
    try {
      const Levels = await Level.find()
        .populate("Owner", "username role")
        .populate({
          path: "Emd",
          select: ["Title", "Faculty"],
          populate: {
            path: "Faculty",
            select: ["Title", "Speciality"],
            populate: {
              path: "Speciality",
              select: "Title",
            },
          },
        });
      res.status(200).json({ success: true, Msg: "All Levels", Levels });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  EditLevel: async (req, res) => {
    try {
      const id = req.params.id;
      const level = await Level.findById(id).select("Owner");
      if (level.Owner.equals(req.user._id) || req.user.role === "super_admin") {
        await Level.findByIdAndUpdate(id, {
          $set: {
            Title: req.body.Title,
          },
        });
        res.status(200).json({ success: true, msg: "Level Update" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  DeleteLevel: async (req, res) => {
    try {
      const id = req.params.id;
      const LevelData = await Level.findById(id);
      if (
        LevelData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        const QuizsIds = LevelData.Quizs;
        const emdId = LevelData.Emd;
        for (const quiz of QuizsIds) {
          await Quiz.findByIdAndRemove(quiz);
        }
        await Emd.findByIdAndUpdate(emdId, {
          $pull: { Levels: id },
        });
        await Level.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "level Deleted" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  // quizs controllers
  AddQuiz: async (req, res) => {
    try {
      const Question = req.body.Question;
      const RightAnswer = req.body.RightAnswer;
      const FalseAnswers = req.body.FalseAnswers;
      const Review = req.body.Review;
      const Picture = req.body.Picture;
      const levelId = req.body.Level;
      const Counter = req.body.Counter;
      const Owner = req.user._id;
      const newQuiz = new Quiz({
        Question,
        RightAnswer,
        FalseAnswers,
        Review,
        Picture,
        Counter,
        Owner,
        Level: levelId,
      });
      await newQuiz.save();
      await Level.findByIdAndUpdate(
        levelId,
        {
          $push: { Quizs: newQuiz._id },
        },
        { new: true }
      );
      res.status(201).json({ success: true, Msg: "Quiz Added", newQuiz });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  GetQuiz: async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id)
        .populate("Level", "Title")
        .populate("Owner", "username role");
      res.status(200).json({ success: true, Msg: "Single quiz", quiz });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  AllQuizs: async (req, res) => {
    try {
      const Quizs = await Quiz.find()
        .populate("Owner", "username role")
        .populate("Level", "Title");
      res.status(200).json({ success: true, Msg: "All Levels", Quizs });
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  EditQuiz: async (req, res) => {
    try {
      const id = req.params.id;
      const quizData = await Quiz.findById(id);
      if (
        quizData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        await Quiz.findByIdAndUpdate(id, {
          $set: {
            Question: req.body.Question,
            RightAnswer: req.body.RightAnswer,
            FalseAnswers: req.body.FalseAnswers,
            Review: req.body.Review,
            Picture: req.body.Picture,
          },
        });
        res.status(200).json({ success: true, msg: "Quiz Update" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  DeleteQuiz: async (req, res) => {
    try {
      const id = req.params.id;
      const quizData = await Quiz.findById(id);
      if (
        quizData.Owner.equals(req.user._id) ||
        req.user.role === "super_admin"
      ) {
        const users = await User.find().select("bookmarks");
        for (let i = 0; i < users.length; i++) {
          if (users[i].bookmarks.includes(id)) {
            await User.findByIdAndUpdate(users[i]._id, {
              $pull: { bookmarks: id },
            });
          }
        }
        await Level.findByIdAndUpdate(quizData.Level, {
          $pull: { Quizs: id },
        });
        await Quiz.findByIdAndDelete(id);
        res.status(200).json({ success: true, msg: "quiz Deleted" });
      } else {
        res.status(401).json({ success: false, Msg: "not authorized" });
      }
    } catch (error) {
      res.status(500).json({ success: false, Msg: "server Err" });
    }
  },
  UpdateCoins: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.user.id, {
        $set: {
          coins: req.body.coins,
        },
      });
      res.status(201).json({ success: true, Message: "coins updated" });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  updateSolved: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.solved.includes(req.body.quiz)) {
        res.status(201).json({
          success: true,
          Message: "already solved",
          solved: user.solved,
        });
      } else {
        await User.findByIdAndUpdate(req.user.id, {
          $push: {
            solved: req.body.quiz,
          },
        });
        res.status(201).json({
          success: true,
          Message: "solved added",
          solved: user.solved,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  updateBookmarks: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (user.bookmarks.includes(req.body.bookmark)) {
        const newbookmarks = await User.findByIdAndUpdate(
          req.user.id,
          {
            $pull: {
              bookmarks: req.body.bookmark,
            },
          },
          { new: true }
        );
        res.status(201).json({
          success: true,
          Message: "bookmark removed",
          Booked: newbookmarks.bookmarks,
        });
      } else {
        const newbookmarks = await User.findByIdAndUpdate(
          req.user.id,
          {
            $push: {
              bookmarks: req.body.bookmark,
            },
          },
          { new: true }
        );
        res.status(201).json({
          success: true,
          Message: "bookmark added",
          Booked: newbookmarks.bookmarks,
        });
      }
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  getBookmarks: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const bookmarksList = user.bookmarks;
      let filledBookmarks = [];
      for (let i = 0; i < bookmarksList.length; i++) {
        let bookmark = await Quiz.findById(bookmarksList[i]);
        filledBookmarks.push(bookmark);
      }
      res.status(201).json({
        success: true,
        Message: "bookmarks List",
        Booked: filledBookmarks,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};

module.exports = QuizCtrl;
