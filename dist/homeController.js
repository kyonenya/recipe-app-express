"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCourses = exports.render = void 0;
const courses_1 = require("./courses");
const render = (viewName, req, res) => {
    res.render(viewName);
};
exports.render = render;
const showCourses = (req, res) => {
    res.render('courses', { offeredCourses: courses_1.courses });
};
exports.showCourses = showCourses;
