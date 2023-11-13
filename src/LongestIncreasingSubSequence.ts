
function lengthOfLIS(nums: number[]): number {
    //init an array of subproblems
    const dp: number[] = new Array(nums.length)

    function maxOfAllRelevantSubProblems(idx: number, s: number[]): number {
        if (s.length === 1 && s[0] === -1) {
            return 0
        }
        const results = s.map(problemIdx => {
            return dp[problemIdx]
        })
        return Math.max(...results)
    }
    // console.log(nums)
    //subproblems for idx 6 lengthOfLis(6)
    // const lengthOfLis5: number[] = []
    // nums.slice(0, 5).map((currElem, index) => {
    //     currElem < nums[5] && lengthOfLis5.push(index)
    // })
    // console.log(lengthOfLis5)
    // array of subproblems, each elem of array is an array of dependency
    const subProblems: number[][] = new Array(nums.length)
    subProblems[0] = [-1]
    // subProblems[1] = [-1] // caused a bug
    nums.slice(1,).map((currElem, i) => {
        const arr: number[] = []
        nums.slice(0, i+1).map((elem, j) => {
            elem < currElem && arr.push(j)
        })
        subProblems[i+1] = arr.length > 0 ? arr : [-1]
    })
    // print the subproblems arr
    // subProblems.map((s, k) => {
    //     console.log(`subProblems${k}: ${s}`)
    // })

    for (let i = 0; i < nums.length; i++) {
        dp[i] = 1 + maxOfAllRelevantSubProblems(i, subProblems[i])
    }
    // dp[5] = 1 + maxOfAllRelevantSubProblems(5, subProblems[5])
    // console.log(`dp5: ${dp[5]}`)
    // return dp[5]
    // return the subproblem with max value
    // console.log(`dp: ${dp}`)
    return Math.max(...dp)
};
const logToConsole = (nums: number[]) => {
    console.log(`SubSequence: ${nums} lengthOfLis: ${lengthOfLIS(nums)}`)
}

logToConsole([10,9,2,5,3,7,101,18])
logToConsole([0,1,0,3,2,3])
logToConsole([7,7,7,7,7,7,7])