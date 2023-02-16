
const math = require('mathjs');

function ConvertHandler() {
    this.getNum = function (input) {
        var result = input.replace(/[a-z]/gi, "");
        var split = result.split("/");

        if (split.length > 2) {
            return "invalid number";
        } else if (result == "") {
            return 1;
        } else {
            return math.round(math.evaluate(result), 6);
        }
    };

    this.getUnit = function (input) {
        var result = input.replace(/[^a-z]/gi, "");
        var units = [
            "gal",
            "l",
            "mi",
            "km",
            "lbs",
            "kg",
            "GAL",
            "L",
            "MI",
            "KM",
            "LBS",
            "KG"
        ];

        if (units.includes(result) == false) {
            return "unknown input unit";
        } else {
            return result.toLowerCase();
        }
    };

    this.getReturnUnit = function (initUnit) {
        switch (initUnit) {
            case "gal":
                return "l";
                break;
            case "l":
                return "gal";
                break;
            case "mi":
                return "km";
                break;
            case "km":
                return "mi";
                break;
            case "lbs":
                return "kg";
                break;
            case "kg":
                return "lbs";
                break;
        }
    };

    this.spellOutUnit = function (unit) {
        switch (unit) {
            case "gal":
                return "gallons";
                break;
            case "l":
                return "litres";
                break;
            case "mi":
                return "miles";
                break;
            case "km":
                return "kilometres";
                break;
            case "lbs":
                return "pounds";
                break;
            case "kg":
                return "kilograms";
                break;
        }
    };

    this.convert = function (initNum, initUnit) {
        const galToL = 3.78541;
        const lbsToKg = 0.453592;
        const miToKm = 1.60934;

        switch (initUnit) {
            case "gal":
                return math.round(initNum * galToL, 6);
                break;
            case "l":
                return math.round(initNum / galToL, 6);
                break;
            case "mi":
                return math.round(initNum * miToKm, 6);
                break;
            case "km":
                return math.round(initNum / miToKm, 6);
                break;
            case "lbs":
                return math.round(initNum * lbsToKg, 6);
                break;
            case "kg":
                return math.round(initNum / lbsToKg, 6);
                break;
        }
    };

    this.getString = function (initNum, initUnit, returnNum, returnUnit) {
        var result = {
            initNum: initNum,
            initUnit: initUnit,
            returnNum: returnNum,
            returnUnit: returnUnit,
            string:
                initNum +
                " " +
                this.spellOutUnit(initUnit) +
                " converts to " +
                returnNum +
                " " +
                this.spellOutUnit(returnUnit)
        };

        if (initNum == "invalid number" && initUnit == "unknown input unit") {
            return { error: "invalid number and unit", string: "Error - invalid number and unit" };
        } else if (initNum == "invalid number") {
            return { error: "invalid number", string: "Error - invalid number" };
        } else if (initUnit == "unknown input unit") {
            return { error: "invalid unit", string: "Error - invalid unit" };
        } else {
            return result;
        }
    };
}

module.exports = ConvertHandler;