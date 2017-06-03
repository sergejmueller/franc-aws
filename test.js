const chai = require( 'chai' )
const chaiHttp = require( 'chai-http' )
const expect = chai.expect

chai.use( chaiHttp )

const bundles = {
    eng: 'There is no specific evidence, no facts, just assumptions, allegations and conclusions based on those allegations nothing more.',
    deu: 'Gilbert Baker war ein US-amerikanischer Künstler und Aktivist der Lesben- und Schwulenbewegung. Er entwarf 1978 die Regenbogenfahne als deren weltweites Symbol.',
    spa: 'Nikoloz Basilashvili no sabía lo que era enfrentarse a Rafa Nadal. Sí se había medido a Federer, Berdych, Goffin o Thiem, pero nunca al rey de la tierra batida.',
    rus: 'Путин предложил свалить на Трампа ответственность за плохую погоду в России. Президент ярко выступил и много раз пошутил на Петербургском экономическом форуме.',
    fra: 'La capsule Soyouz les a ramenés sur Terre. L’atterrissage dans la steppe kazakhe s’est produit à 16h10 heure de Bruxelles. La fin d’un voyage de six mois.',
    ita: 'Molto più dure le espressioni di altri politici come il premier francese Édouard Philippe che in diretta radiofonica, ha definito una calamità la decisione Trump.',
    por: 'Donald Trump justificou a medida com a necessidade de defender os americanos acima de tudo mas pode muito bem virar-se o feitiço contra o feiticeiro.',
    ukr: 'У столиці Афганістану невідомі озброєні люди атакували гостьовий будинок, де жили іноземці. Вони вбили громадянку Німеччини та викрали громадянку Фінляндії.',
    tur: 'Kabil’de bulunan misafirhaneye yapılan saldırıda biri güvenlik görevlisi diğeri Alman yardım gönüllüsü iki kişi hayatını kaybetti.',
    ell: 'Επιδεικνύοντας ισχυρές αντιστάσεις, η ελληνική οικονομία κατάφερε να αναπτυχθεί στο πρώτο τρίμηνο του έτους, παρά την καθυστέρηση στην ολοκλήρωση της δεύτερης.',
    fas: 'کرد که معاهده پاریس سبب از بین بردن فرصت های شغلی بسیاری در آمریکا شده است و «این چیزی نیست که ما به آن نیاز داریم',
    arb: 'والانسحاب الاميركي من الاتفاقية سيشكل تفككا فعليا بعد شهرا على هذا الاتفاق التاريخي الذي كانت بكين وواشنطن في ظل رئاسة باراك اوباما، ابرز مهندسيه'
}

Object.keys( bundles ).forEach( lang => {

    it ( lang, ( done ) => {
        chai.request( process.env.npm_package_api_host )
            .post( process.env.npm_package_api_path )
            .set( 'content-type', 'application/x-www-form-urlencoded' )
            .send( { 'data': bundles[lang] } )
            .then( res => {

                expect( res.statusCode ).to.equal( 200 )
                expect( res.text ).to.equal( lang )

            } ).then( done )
            .catch( err => {

                throw err

            } )
    } )

} )
