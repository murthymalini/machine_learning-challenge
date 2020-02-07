var url = `/predict`;

var schoolName = [],
    model = [],
    no = [],
    prediction = [],
    probability = [];

d3.json(url).then((data) => {
    // console.log(data)
    for (i = 0; i < 3; i++) {
        data[i].forEach((item) => {
            model.push(item.Model)
            no.push(item.no)
            prediction.push(item.prediction)
            probability.push(item.probability)
        })
    }
    console.log(model)
    console.log(no)
    console.log(prediction)
    console.log(probability
})