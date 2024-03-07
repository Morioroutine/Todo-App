export var Today = () => {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var dayOfWeek = date.getDay();
    var dayOfWeekStr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][dayOfWeek]; 
    const today = `${month}/${day}(${dayOfWeekStr})`;
    return today;
};

