function reportHtml(answer, boardPaperCw, user) {
  generatedPaper = boardPaperCw[Object.keys(boardPaperCw)[2]]

  let currentQuestion = ''
  let qsn = ''

  let chapter
  let subject
  let q_total_q = 0
  let q_attempt = 0
  let q_right = 0
  let q_wrong = 0
  let q_skipped = 0
  let correct_percent = 0
  let obtain_marks = 0
  let tot_questions = 0

  generatedPaper.forEach((item, index) => {
    q_total_q += 1

    let row = generatedPaper[index]
    chapter = row['q_chapter']
    subject = row['q_subject']
    let q_img_name = ''
    let imgFileName = ''
    let score = '<div class="score"> Score :' + 0 + '</div>'
    let ans = '<div class="cans">Correct Ans :' + row['q_correct_ans'] + '</div>'

    let chapterName = '<div class="ans"> Chapter :' + row['q_chapter'] + '</div>'
    let explanation = '<div class="ans">Explanation :' + row['q_explanation'] + '</div>'
    let yans = answer[index]
    let yourAns = '<div class="ans">Your Ans:  </div>'
    let qtype = row['q_type']

    tot_questions += parseInt(row['q_mark'])
    if (!yans) {
      q_skipped += 1
      yourAns = '<div class="ans">Your Ans:  You have Skipped!</div>'
      score = '<div class="score"> Score :' + 0 + '</div>'
    } else {
      q_attempt += 1
      if (qtype === 'FIB' || qtype === 'FIBP') {
        if (yans.toLowerCase() === row['q_correct_ans'].toLowerCase()) {
          q_right += 1
          obtain_marks += parseInt(row['q_mark'])
          score = '<div class="score"> Score :' + row['q_mark'] + '</div>'
        } else {
          q_wrong += 1
        }
      } else {
        if (yans === row['q_correct_ans']) {
          q_right += 1
          obtain_marks += parseInt(row['q_mark'])
          score = '<div class="score"> Score :' + row['q_mark'] + '</div>'
        } else {
          q_wrong += 1
        }
      }

      if (qtype == 'TF' || qtype == 'TFP') {
        if (yans.toUpperCase() == 'T') {
          yans = 'TRUE'
        } else if (yans.toUpperCase() == 'F') {
          yans = 'FALSE'
        }
      }
      yourAns = '<div class="ans">Your Ans: ' + yans + '</div>'
    }

    qsn = `<div class="question">${index + 1}. ${row['q_details']} '</div>`
    currentQuestion += qsn + '' + imgFileName + '' + yourAns + '' + score + '' + ans + '' + chapterName + '' + explanation
  })

  correct_percent = ((q_right / q_total_q) * 100).toFixed(2)

  let css =
    '<style> table, td, th {border: 3px solid #FFFFFF;}.cans{width:96%; height:auto;  display:inline-block; color:#006600; font-size:100%; float:left; margin-top:10px;}.ans{width:96%; height:auto;  display:inline-block; font-size:100%; float:left; margin-top:10px;}'
  css += '.exp{width:96%; height:auto;  display:block; font-size:90%; float:left; margin-top:10px; margin-bottom:10px;}'
  css += '.score{width:96%; height:auto;  display:inline-block; font-size:100%; float:left; font-weight:bold;}'
  css += '.question{width:96%; height:auto;display:inline-block; font-weight:bold; font-size:110%; float:left; margin-top:20px; margin-bottom:20px;}</style>'
  let logoFile = ''
  let logo = '<div style="width:100%; height:250px; display:inline-block;  margin-top:20px;" >'
  logo += '<div style="width:100%; height:180px; display:inline-block;  text-align:center;" ><center><img src="" height="170px"/>Image logo</center></div>'
  logo += '<div style="width:100%; height:40px; padding:10px; display:inline-block;font-size:17pt; text-align:center;" > <u>Exam Report</u></div>'
  logo += '</div>'

  let takenTime = answer.endTime.getTime() - answer.startTime.getTime()
  let minute = Math.floor(takenTime / (1000 * 50))
  let second = Math.floor(takenTime / 1000 - minute * 60)

  let userInfo = '<center><table width="100%" border="0" style="font-size:14pt; border-top: 0.1mm solid #000000; "><tr><td width="300" height="29">Name : ' + user.name + '</td>'
  userInfo += '<td width="100"></td><td width="300"> School: ' + user.sch_id + '</td></tr><tr><td height="29">Standard: ' + user.std + '</td><td></td><td>Division: ' + user.div + '</td></tr>'
  userInfo +=
    '<tr><td height="29">Roll No: ' +
    user.roll_no +
    '</td><td></td><td>Subject: ' +
    subject +
    '</td></tr><tr><td>Exam Date : ' +
    new Date().toDateString() +
    '</td><td></td><td>Time Taken : ' +
    minute +
    ' Mins ' +
    second +
    ' Secs </td></tr><tr><td>Start Time : ' +
    new Date(answer.startTime).toLocaleTimeString() +
    '</td><td></td><td>End Time : ' +
    new Date(answer.endTime).toLocaleTimeString() +
    '</td></tr></table></center>'

  let tableHead = '<br><br><table width="100%" style="background:#33CCFF;" cellpadding="5" cellspacing="0"><tr valign="middle"><td width="282" height="25">Chapter Name</td>'
  tableHead += '<td width="70">Total Q</td><td width="64">Attempted</td><td width="64">Right</td><td width="64">Wrong</td><td width="64">Skipped</td><td width="107">Percentage</td></tr>'

  let tableContent = ''
  tableContent +=
    '<tr><td height="25">' +
    q_total_q +
    '</td><td>' +
    q_attempt +
    '</td><td>' +
    q_right +
    '</td><td>' +
    q_wrong +
    '</td><td>' +
    q_skipped +
    '</td><td>' +
    correct_percent +
    '</td></tr>'

  let tableFooter = '</table>'

  let marksObtainString = '<div  style="font-size:14pt; display:inline-block; margin-top:20px; margin-bottom:20px;"> Obtain Score : ' + obtain_marks + ' out of ' + tot_questions + ' </div>'

  let constructTable = tableHead + '' + tableContent + '' + tableFooter + '' + marksObtainString

  return css + '' + logo + '' + userInfo + '' + constructTable + '' + currentQuestion
}

export default reportHtml
