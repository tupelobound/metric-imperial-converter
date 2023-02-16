// require mathjs module
const math = require('mathjs');

// create ConvertHandler template
function ConvertHandler() {
    // get digit from user input
    this.getNum = function (input) {
        var result = input.replace(/[a-z]/gi, "");
        var split = result.split("/");

        // handle invalid numbers
        if (split.length > 2) {
            return "invalid number";
        } else if (result == "") {
            return 1;
        } else {
            return math.round(math.evaluate(result), 6);
        }
    };

    // get unit from user input
    this.getUnit = function (input) {
        var result = input.replace(/[^a-z]/gi, "");

        // create list of possible units
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

        // handle incompatible unit input
        if (units.includes(result) == false) {
            return "unknown input unit";
        } else {
            return result.toLowerCase();
        }
    };

    // return the correct converted unit based on input unit
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

    // return the full unit name based on input
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

    // conversion logic
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

    // create result string from input and output
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

        // create error string
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

// export this module
module.exports = ConvertHandler;