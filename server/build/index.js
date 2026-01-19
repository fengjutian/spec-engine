"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
var db = { files: [], users: [], roles: [] };
function generateCrudApi(entityName) {
    var base = "/".concat(entityName.toLowerCase(), "s");
    app.get(base, function (req, res) { return res.json(db[entityName.toLowerCase() + 's']); });
    app.post(base, function (req, res) {
        var record = __assign(__assign({}, req.body), { id: Date.now().toString() });
        db[entityName.toLowerCase() + 's'].push(record);
        res.json(record);
    });
    app.put("".concat(base, "/:id"), function (req, res) {
        var records = db[entityName.toLowerCase() + 's'];
        var idx = records.findIndex(function (r) { return r.id === req.params.id; });
        records[idx] = __assign(__assign({}, records[idx]), req.body);
        res.json(records[idx]);
    });
    app.delete("".concat(base, "/:id"), function (req, res) {
        var records = db[entityName.toLowerCase() + 's'];
        var idx = records.findIndex(function (r) { return r.id === req.params.id; });
        records.splice(idx, 1);
        res.json({ ok: true });
    });
}
generateCrudApi('File');
generateCrudApi('User');
generateCrudApi('Role');
app.listen(5000, function () { return console.log('API Server running at http://localhost:5000'); });
