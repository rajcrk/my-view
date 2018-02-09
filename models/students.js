var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var studentsSchema = new mongoose.Schema({
    REGNO: { displayName: 'REGNO', access: 'REGNO', type: 'number' },
    NAME: {type: String},
    BATCH: {type: String},
    SEM1: {type: Object, default: null},
    SEM2: {type: Object, default: null},
    SEM3: {type: Object, default: null},
    SEM4: {type: Object, default: null},
    SEM5: {type: Object, default: null},
    SEM6: {type: Object, default: null},
    SEM7: {type: Object, default: null},
    SEM8: {type: Object, default: null},
    
});



module.exports = mongoose.model("Student", studentsSchema);