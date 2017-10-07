export default {
    searchparamsCategory: function(stringVal) {
        if (stringVal === "DC" || stringVal === "dc" || stringVal === "Marvel" ||
            stringVal === "marvel" || stringVal === "Image" || stringVal === "image" || stringVal === "Darkhorse" || stringVal === "darkhorse") {
            return true;
        }
        return false;
    },
    capitalizeFirst: function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    capitalizeFirstTwo: function capitalizeFirstAndSecondLetter(string) {
        return string.toUpperCase();
    }
};