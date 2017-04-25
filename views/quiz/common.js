var PASS_SCORE = 100;
var CORRECT_ANSWERS = ['a', 'b', 'a', 'a', 'b', 'a', 'a', 'a', 'e', 'a', 'c', 'b', 'd', 'd', 'c'];
var AUDIO;


function update_answers(qIX, answer, proceed) {
    answerFeedback(qIX, answer);
    answer = (answer == '' ? 'N' : answer);
    var doc_id = getStorageObj('doc')._id;
    var answers = [];
    select_doc(
        doc_id,
        function (doc) {
            answers = doc.answers;
            answers[qIX] = answer;
            doc.answers = answers;
            update_doc(doc, function () {
                setStorageObj('doc', doc);
                proceed();
            });
        }
    );
}


function resetSession(proceed) {
    app.welcome.reset();
    app.q1.reset();
    app.q2.reset();
    app.q3.reset();
    app.q4.reset();
    app.q5.reset();
    app.q6.reset();
    app.q7.reset();
    app.q8.reset();
    app.q9.reset();
    app.q10.reset();
    app.q11.reset();
    app.q12.reset();
    app.q13.reset();
    app.q14.reset();
    app.q15.reset();
    app.result.reset();
    app.profile.reset();
    app.loginSync.reset();
    app.loginExport.reset();
    clearAllSessionStorage(function () {
        proceed();
    });
}