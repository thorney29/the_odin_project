/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! namespace exports */
/*! exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _loadItems__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./loadItems */ \"./src/loadItems.js\");\n/* harmony import */ var _saveItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./saveItem */ \"./src/saveItem.js\");\n\n\n\n_loadItems__WEBPACK_IMPORTED_MODULE_0__.default;\ndocument.getElementById('viewAllProjectFolders').addEventListener('click', _saveItem__WEBPACK_IMPORTED_MODULE_1__.showAllProjectFolders);\ndocument.getElementById('viewAllTasksFolders').addEventListener('click', _saveItem__WEBPACK_IMPORTED_MODULE_1__.showAllTasksFolder);\n\ndocument.getElementById('showCreateNewTask').addEventListener('click', function() {\n    document.getElementById('createNewTask').classList.toggle('display');\n    document.getElementById('taskList').classList.toggle('hide');\n});\ndocument.getElementById('showCreateNewProject').addEventListener('click', function() {\n    document.getElementById('createNewProject').classList.toggle('display');\n    document.getElementById('projectList').classList.toggle('hide');\n});\ndocument.getElementById('viewTodayTasksFolder').addEventListener('click', _saveItem__WEBPACK_IMPORTED_MODULE_1__.showTodaysTasks);\n\ndocument.getElementById('saveProject').addEventListener('click', _saveItem__WEBPACK_IMPORTED_MODULE_1__.createNewProject)\ndocument.getElementById('saveProject').addEventListener('click', function (){\n    document.getElementById('createNewProject').classList.remove('display');\n    document.getElementById('projectList').classList.toggle('hide');\n});\ndocument.getElementById('saveTask').addEventListener('click', _saveItem__WEBPACK_IMPORTED_MODULE_1__.createNewTask)\ndocument.getElementById('saveTask').addEventListener('click', function (){\n    document.getElementById('createNewTask').classList.remove('display');\n    document.getElementById('taskList').classList.toggle('hide');\n});\n\n// document.querySelectorAll('.removeTaskButton').forEach(button => button.addEventListener('click', removeTask));\n\n//# sourceURL=webpack://todos/./src/index.js?");

/***/ }),

/***/ "./src/loadItems.js":
/*!**************************!*\
  !*** ./src/loadItems.js ***!
  \**************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__.r, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nStorage.prototype.setObj = function(key, obj) {\n    return this.setItem(key, JSON.stringify(obj))\n}\nStorage.prototype.getObj = function(key) {\n    return (this.getItem(key))\n}\n\nlet loadItems = (() => {\n    /* Get from local storage */\n    let savedProjectFolder = [];\n    let projectFolder = [];\n     if(localStorage.getItem('projectFolder', projectFolder)) {\n        try {\n            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));\n        } catch(e) {\n            localStorage.removeItem('projectFolder')\n        }\n    } \n\n    savedProjectFolder = projectFolder;\n})();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (loadItems);\n\n\n//# sourceURL=webpack://todos/./src/loadItems.js?");

/***/ }),

/***/ "./src/project.js":
/*!************************!*\
  !*** ./src/project.js ***!
  \************************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Project\n/* harmony export */ });\nclass Project {\n        constructor(projectName) {\n            this.projectName = projectName;\n        }\n    }\n\n//# sourceURL=webpack://todos/./src/project.js?");

/***/ }),

/***/ "./src/saveItem.js":
/*!*************************!*\
  !*** ./src/saveItem.js ***!
  \*************************/
/*! namespace exports */
/*! export createNewProject [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createNewTask [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showAllProjectFolders [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showAllTasksFolder [provided] [no usage info] [missing usage info prevents renaming] */
/*! export showTodaysTasks [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__, __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createNewTask\": () => /* binding */ createNewTask,\n/* harmony export */   \"createNewProject\": () => /* binding */ createNewProject,\n/* harmony export */   \"showTodaysTasks\": () => /* binding */ showTodaysTasks,\n/* harmony export */   \"showAllTasksFolder\": () => /* binding */ showAllTasksFolder,\n/* harmony export */   \"showAllProjectFolders\": () => /* binding */ showAllProjectFolders\n/* harmony export */ });\n\t// Variables\n\tconst Project = __webpack_require__(/*! ./project.js */ \"./src/project.js\").default; /* get the Item object */\n\tconst Task = __webpack_require__(/*! ./task.js */ \"./src/task.js\").default; /* get the Item object */\n    let projectFolder = [];\n    let taskFolder = [];\n    let template = '';\n    \n //    let displayEditButton = document.createElement('button');\n //    displayEditButton.classList.add('editbButton');\n\n //    let displayRemoveButton = document.createElement('div');\n //    displayRemoveButton.classList.add('removeButton');\n\t// displayRemoveButton.addEventListener('click', removeItem);\n\n\t// on page load\n\n\tconst loadContentInStorage = (() => {\n\t\tif(localStorage.getItem('projectFolder', projectFolder)) {\n\t        try {\n\t            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));\n\t            updateProjectDisplay(projectFolder, template, projectList);\t\n\t           \n\t        } catch(e) {\n\t            localStorage.removeItem('projectFolder');\n\t        }\n\t    } \n\t    if(localStorage.getItem('taskFolder', taskFolder)) {\n\t        try {\n\t            taskFolder = JSON.parse(localStorage.getItem('taskFolder'));\n\t            updateDisplay(projectFolder, template, taskFolder);\t\n\t           \n\t        } catch(e) {\n\t            localStorage.removeItem('taskFolder');\n\t        }\n\t    } \n\t})();    \n\n    function saveToLocalStorage () {\n\t    if(localStorage.getItem('projectFolder', projectFolder)) {\n\t        try {\n\t            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));\n\t            console.log(\"this is to get from storage\");\n\t\t} catch(e) {\n\t            localStorage.removeItem('projectFolder')\n\t        }\n\t    }\n\t}\n\tfunction saveProjectToLocalStorage () {\n\t    if(localStorage.getItem('projectFolder', projectFolder)) {\n\t        try {\n\t            projectFolder = JSON.parse(localStorage.getItem('projectFolder'));\n\t            console.log(\"this is to get from storage\");\n\t\t} catch(e) {\n\t            localStorage.removeItem('projectFolder')\n\t        }\n\t    }\n\t}\n    // called through functions\n \tfunction saveSavedProjectFolder (projectFolder) {\n \t\tlocalStorage.setObj('projectFolder', projectFolder);\n\t}   \n\n\tfunction getSavedProjectFolder() {\n\t\tprojectFolder = JSON.parse(localStorage.getItem('projectFolder'));\n\t\tconsole.log(\"this is in saveSavedProjectFolder\");\n\t\treturn projectFolder;\n\t}\n\n\t// new \n\tfunction saveSavedTaskFolder (taskFolder) {\n \t\tlocalStorage.setObj('taskFolder', taskFolder);\n\t}   \n\tfunction getSavedTaskFolder() {\n\t\ttaskFolder = JSON.parse(localStorage.getItem('taskFolder'));\n\t\tconsole.log(\"this is in saveSavedTaskFolder\");\n\t\treturn taskFolder;\n\t}\n\n\t/* NEW  To save projects => add to project folder, update display, save project folder */ \n    function saveNewProject (projectName) {\n\t\tprojectFolder.push(projectName);\n\t \t// projectFolder.reverse();\n\t \tupdateProjectDisplay(projectFolder, template, projectList);\t \t\n\t\tsaveSavedProjectFolder(projectFolder);\n\t}  \n\t/* Save a new task --rename from item to task, update project folder to be task folder */ \n\tfunction saveNewTask (task) {\n\t\ttaskFolder.push(task);\n\t \t// projectFolder.reverse();\n\t \tupdateDisplay(taskFolder, template, taskList);\t \t\n\t\tsaveSavedTaskFolder(taskFolder);\n\t}\n\n\tfunction resetProjectList () {\n\t\treturn template = '';\n\t}\n\n\tfunction resetTaskList () {\n\t\treturn template = '';\n\t}\n\t// function showAllItemsFolder() {\n\t// \tresetProjectList();\n\t// \tupdateDisplay(projectFolder,template,projectList);\n\t// }\n\tfunction showAllProjectFolders() {\n\t\tresetProjectList();\n\t\tupdateProjectDisplay(projectFolder, template, projectList);\n\t}\n\t\n\t/* Show all Tasks in the tasks folder */ \n\tfunction showAllTasksFolder() {\n\t\tresetTaskList();\n\t\tupdateDisplay(taskFolder, template, taskList);\n\t}\n\n\t// on click\n\tconst createNewProject = () => {\n\t\tlet projectName = document.getElementById(\"projectName\").value;\n\t\tlet project = new Project(projectName);\n\t\tsaveNewProject(project);\n\t\tdocument.getElementById('createNewProject').classList.remove('display');\n\t}\n\n\t// on click\n\t// on project name click get taskfolder and filter task items for task items that include project name\n\n\n\n\n\n \tconst createNewTask =() => {\n\t\tlet title = document.getElementById(\"title\").value;\n\t    let description = document.getElementById(\"description\").value;\n\t    let date = document.getElementById(\"dueDate\").value; /* Format date */\n\t    let dueDate = date.replace(/(\\d{4})-(\\d{1,2})-(\\d{1,2})/, function(match,y,m,d) { \n        return m + '/' + d + '/' + y;});\n\t    let priority = document.getElementById(\"priority\").value;\n\t    let notes = document.getElementById(\"notes\").value;\n\t    let projectName = document.getElementById(\"project\").value;\n\t    // console.log(project)\n\t    let task = new Task(title, description, dueDate, priority, notes, projectName);\n\t\tsaveNewTask(task);\n\t\tdocument.getElementById('createNewTask').classList.remove('display');\n    };\n\n \t// on click\n\tfunction removeTask(e) { \n\t\tlet arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');\n\t\ttaskFolder.splice(arrayIndex, 1);\n\t\tupdateDisplay(taskFolder, template, taskList);\n\t \tsaveSavedTaskFolder(taskFolder);\n\t}\n\t// new\n\tfunction removeProject(e) { \n\t\tlet arrayIndex =  e.currentTarget.parentNode.getAttribute('data-array-index');\n\t\tprojectFolder.splice(arrayIndex, 1);\n\t\tupdateProjectDisplay(projectFolder, template, projectList);\n\t \tsaveSavedProjectFolder(projectFolder);\n\t}\n\tlet showTodaysTasks = (task) => {\n\t\tresetTaskList();\n\t\tgetSavedTaskFolder();\n\t\t// let tempFolder = projectFolder;\n\t\tconsole.log('taskFolder in show todays task');\n\t\tconsole.log(taskFolder);\n \t\tlet todaysTasks  = taskFolder.filter(function (task) {\n\t\t  \t\tvar date = new Date().toLocaleString().split(/\\D/).slice(0,3).map(num=>num.padStart(2,\"0\")).join(\"/\");\n\t\t  \t\tconsole.log(date);\n\t\t  \t\tconsole.log(task.dueDate);\n\t\t  \t\treturn (date == task.dueDate);\n\t\t});\n\t\tupdateDisplay(todaysTasks, template, taskList);\n\t}\n\t// render on page load, item save, and item remove \n\tfunction updateProjectDisplay (array, template, node) {\n\t\t\tconsole.log('array');\n\t\t\tconsole.log(array);\n\t\t\t// console.log('node');\n\t\t\t// console.log(node);\n\t\t\t// console.log('template');\n\t\t\t// console.log(template);\n\t\tfunction render (template, node) {\n\t\t\tif (!node) {return;}\n\t\t\tif(array.length <= 0) {\n\t\t\t\ttemplate += 'There is nothing to display.';\n\t\t\t\tnode.innerHTML = template;\n\t\t\t} else { \n\t\t\t\tfor (let p = 0; p < array.length; p++) {\n\t\t\t\t\ttemplate += `\n\t\t\t            <li> ${array[p].projectName}\n\t\t\t             <button data-array-index=\"${p}\" class=\"editProjectButton\"><i class=\"far fa-edit\"></i></button>\n\t\t\t             <button data-array-index=\"${p}\" class=\"removeProjectButton\"><i class=\"far fa-trash-alt\"></i></button></div>\n\t\t\t\t\t\t</li>\n\t\t            `;\n\t\t\t\t\tnode.innerHTML = template;\n\t\t\t\t};\n\t\t\t\tdocument.querySelectorAll('.removeProjectButton').forEach(button => button.addEventListener('click', removeProject));\n\t\t\t}\t\n\t\t }\n\t\trender(template, node);\n\t}\n\t// render on page load, item save, and item remove \n\tfunction updateDisplay (array, template, node) {\n\t\t\tconsole.log('array');\n\t\t\tconsole.log(array);\n\t\t\t// console.log('node');\n\t\t\t// console.log(node);\n\t\t\t// console.log('template');\n\t\t\t// console.log(template);\n\t\tfunction render (template, node) {\n\t\t\tif (!node) {return;}\n\t\t\tif(array.length <= 0) {\n\t\t\t\ttemplate += 'There is nothing to display.';\n\t\t\t\tnode.innerHTML = template;\n\t\t\t} else { \n\t\t\t\tfor (let p = 0; p < array.length; p++) {\n\t\t\t\t\ttemplate += `\n\t\t\t            <div data-array-index=\"${p}\" class=\"card\">\n\t\t                <div class=\"title\"><h2>Title: ${array[p].title}</h2></div>\n\t\t                <div class=\"description\">Description: ${array[p].description}</div> \n\t\t                <div class=\"dueDate\">Due Date: ${array[p].dueDate}</div>\n\t\t                <div class=\"priority\">Priority: ${array[p].priority}</div>\n\t\t                <div class=\"notes\">Notes: ${array[p].notes} </div> \n\t\t                <div class=\"project\">Project: ${array[p].project}</div> \n\t\t                <button data-array-index=\"${p}\" class=\"editTaskButton\"><i class=\"far fa-edit\"></i></button><button data-array-index=\"${p}\" class=\"removeTaskButton\"><i class=\"far fa-trash-alt\"></i></button></div>\n\t\t\t\t\t\t</div>`;\n\t\t\t\t\tnode.innerHTML = template;\n\t\t\t\t};\n\t\t\t\tdocument.querySelectorAll('.removeTaskButton').forEach(button => button.addEventListener('click', removeTask));\n\t\t\t}\t\n\t\t }\n\t\trender(template, node);\n\t}\n\n\n\n\n\n//# sourceURL=webpack://todos/./src/saveItem.js?");

/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/*! namespace exports */
/*! export default [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_require__.r, __webpack_exports__, __webpack_require__.d, __webpack_require__.* */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ Task\n/* harmony export */ });\nclass Task {\n        constructor(title, description, dueDate, priority, notes, project) {\n            this.title = title;\n            this.description = description;\n            this.dueDate = dueDate;\n            this.priority = priority;\n            this.notes = notes;\n            this.project = project;\n        }\n    }\n\n//# sourceURL=webpack://todos/./src/task.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;