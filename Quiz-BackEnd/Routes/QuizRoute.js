const router = require("express").Router();
const QuizCtrl = require("../Controllers/QuizCtrl");
const { admin, protect } = require("../middleware/auth");
//specialities route
//add Speciality
router.post("/speciality", protect, admin, QuizCtrl.AddSpeciality);
// get single speciality
router.get("/speciality/:id", protect, admin, QuizCtrl.GetSpeciality);
//get all Speciality
router.get("/specialities", protect, admin, QuizCtrl.AllSpecialities);
// edit Speciality
router.put("/speciality/:id", protect, admin, QuizCtrl.EditSpeciality);
// delete speciality
router.delete("/speciality/:id", protect, admin, QuizCtrl.DeleteSpeciality);
//Faculties route
//add Faculties
router.post("/Faculty", protect, admin, QuizCtrl.AddFaculty);
// get single speciality
router.get("/Faculty/:id", protect, admin, QuizCtrl.GetFaculty);
//get all Speciality
router.get("/Faculties", protect, admin, QuizCtrl.AllFaculties);
// edit Speciality
router.put("/Faculty/:id", protect, admin, QuizCtrl.EditFaculty);
// delete speciality
router.delete("/Faculty/:id", protect, admin, QuizCtrl.DeleteFaculty);
//Emd route
//add Emd
router.post("/Emd", protect, admin, QuizCtrl.AddEmd);
// get single Emd
router.get("/Emd/:id", protect, admin, QuizCtrl.GetEmd);
//get all Emd
router.get("/Emds", protect, admin, QuizCtrl.AllEmds);
// edit Emd
router.put("/Emd/:id", protect, admin, QuizCtrl.EditEmd);
// delete Emd
router.delete("/Emd/:id", protect, admin, QuizCtrl.DeleteEmd);
//Levels route
//add Level
router.post("/Level", protect, admin, QuizCtrl.AddLevel);
//get all Emd
router.get("/Levels", protect, admin, QuizCtrl.AllLevels);
// get single Emd
router.get("/Level/:id", protect, admin, QuizCtrl.GetLevel);
// edit Emd
router.put("/Level/:id", protect, admin, QuizCtrl.EditLevel);
// delete Emd
router.delete("/level/:id", protect, admin, QuizCtrl.DeleteLevel);
// quizs route
//add quiz
router.post("/quiz", protect, admin, QuizCtrl.AddQuiz);
//get all quiz
router.get("/quizs", protect, admin, QuizCtrl.AllQuizs);
// get single Emd
router.get("/quiz/:id", protect, admin, QuizCtrl.GetQuiz);
// edit Emd
router.put("/quiz/:id", protect, admin, QuizCtrl.EditQuiz);
// delete Emd
router.delete("/quiz/:id", protect, admin, QuizCtrl.DeleteQuiz);
router.get("/GameData", QuizCtrl.GameData);
router.put("/updateCoins", protect, QuizCtrl.UpdateCoins);
router.put("/solved", protect, QuizCtrl.updateSolved);
router.put("/booked", protect, QuizCtrl.updateBookmarks);
router.get("/getBookmarks", protect, QuizCtrl.getBookmarks);
module.exports = router;
