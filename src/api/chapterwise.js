import { tnsBaseUrl } from '../config/index';

export function getSubjectsCwApi(standard) {
  //write the api for subject

  return new Promise((resolve, reject) => {
    return resolve(['math', 'science', 'gk'])
  })
}

export function getChaptersCwApi(subject) {
  console.warn(" api params: ",subject)
  //Write the api
  let data = ['not found']
  if (subject === 'math') data= ['math1', 'math2']
  if (subject === 'science') data= ['science1', 'science2']
  if (subject === 'gk') data= ['gk1']
  return new Promise((resolve, reject) => {
    
    resolve(data)
  })
}

export function generatePaperCwApi(subject, chapter) {
  let data = []
  if (subject === 'math') {
    data = [
      {
        "q_ans_1": "11",
        "q_ans_2": "13",
        "q_ans_3": "15",
        "q_ans_4": "17",
        "q_chapter": "01-Real Numbers",
        "q_correct_ans": "15",
        "q_details": "Find how many two-digit numbers are divisible by 6.  <b>2011</b>",
        "q_explanation": "A number is divisible by 6 if it divisible by both 2 and 3 <br> Test for 2: Any even number is divisible by 2 <br> Test for 3: Any number whose sure of the digits is divisible by 3 <br> ∴ List of 2 digit numbers divisible by 6 are 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90 and 96.",
        "q_mark": "1",
        "q_std": "",
        "q_subject": "Math",
        "q_total_q": "0",
        "q_total_time": "0"
      }, {
        "q_ans_1": "11",
        "q_ans_2": "13",
        "q_ans_3": "15",
        "q_ans_4": "17",
        "q_chapter": "01-Real Numbers",
        "q_correct_ans": "15",
        "q_details": "Find how many two-digit numbers are divisible by 6.  <b>2011</b>",
        "q_explanation": "A number is divisible by 6 if it divisible by both 2 and 3 <br> Test for 2: Any even number is divisible by 2 <br> Test for 3: Any number whose sure of the digits is divisible by 3 <br> ∴ List of 2 digit numbers divisible by 6 are 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90 and 96.",
        "q_mark": "1",
        "q_std": "",
        "q_subject": "Math",
        "q_total_q": "0",
        "q_total_time": "0"
      },
      {
        "q_ans_1": "11",
        "q_ans_2": "13",
        "q_ans_3": "15",
        "q_ans_4": "17",
        "q_chapter": "01-Real Numbers",
        "q_correct_ans": "15",
        "q_details": "Find how many two-digit numbers are divisible by 6.  <b>2011</b>",
        "q_explanation": "A number is divisible by 6 if it divisible by both 2 and 3 <br> Test for 2: Any even number is divisible by 2 <br> Test for 3: Any number whose sure of the digits is divisible by 3 <br> ∴ List of 2 digit numbers divisible by 6 are 12, 18, 24, 30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90 and 96.",
        "q_mark": "1",
        "q_std": "",
        "q_subject": "Math",
        "q_total_q": "0",
        "q_total_time": "0"
      }
    ]
  }

  return new Promise((resolve, reject) => {
    return resolve(data)
  })
}