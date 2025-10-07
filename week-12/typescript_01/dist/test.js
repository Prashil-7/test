"use strict";
//ararrays
function getMax(nums) {
    let maxVal = -1000000000000000;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;
}
getMax([1, 3, 4, 6, 52]);
