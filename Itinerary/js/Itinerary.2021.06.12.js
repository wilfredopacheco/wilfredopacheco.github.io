const MainElement = document.createElement('main')
document.body.append(MainElement)
document.title = 'Lake Belton Trip 2021'

function init(){

    const ImageLink = 'https://images.pexels.com/photos/421759/pexels-photo-421759.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260'

    const Colors = [
        '#264653',
        '#2A9D8F',
        '#E9C46A',
        '#F4A261',
        '#E76F51'
    ]

    const Title = 'Lake Belton Trip 2021'
    
    const TripDetails = [
        {
            EventDate: 'Sunday June 13',
            EndDate: new Date(2021, 05, 14),
            Title: 'Arrive | Check in @ 4',
            Dinner: '🍔 🍟'
        }, {
            EventDate: 'Monday June 14',
            EndDate: new Date(2021, 05, 15),
            Title: 'Lake Day',
            Breakfast: 'carne guisada tacos',
            Lunch: 'on own',
            Dinner: '🍝 🥗 '
        }, {
            EventDate: 'Tuesday June 15',
            EndDate: new Date(2021, 05, 16),
            Title: 'Magnolia girls day Trip',
            Breakfast: 'muffins and fruit',
            Lunch: 'on own',
            Dinner: 'order 🍕 or order elsewhere',
            Notes: 'pick up nuggets for next day'
        }, {
            EventDate: 'Wednesday June 16',
            EndDate: new Date(2021, 05, 17),
            Title: 'lake or whatever you want day',
            Breakfast: 'chicken and waffles',
            Lunch: 'on own',
            Dinner: 'Lemon chicken, wontons, rice, egg drop soup'
        }, {
            EventDate: 'Thursday June 16',
            EndDate: new Date(2021, 05, 18),
            Title: 'Departure | checkout @ 11',
            Breakfast: 'together @ waffle street'
        }    
    ]
    
    const OTHER = `
    * there will be sandwich stuff and ramen for anyone <br>
    * Bring your drinks and snacks 
    `
    document.body.style.backgroundImage = `url(${ImageLink})`
    document.body.style.backgroundSize = 'cover'
    
    $(MainElement).addClass('p-5')
    .addClass('m-5')
    .addClass('container')
    .addClass('mx-auto')

    $(MainElement).append(`<!-- Title -->
    <div class="col-12 display-4 mb-3 text-white"
        >${Title}
    </div>
    <div class="text-white">
        ${OTHER}
    </div>`)

    TripDetails.forEach(function(day, index){

        const {
            EventDate,
            Title,
            Breakfast,
            Lunch,
            Dinner,
            Notes,
            EndDate
        } = day;

        const zero = index < 10 ? 0 : ''
        const EndDateNumber = Number(EndDate.toJSON().split('T')[0].split('-').join(''))

        const $Card = $(MainElement).append(`<!-- Cards -->
        <div class="card card-info mb-2" style="background-color: ${Colors[index]};">
            <div class="card-body">
                <div class="row">

                    <div class="ml-5 p-3 col border d-flex justify-content-center bg-white">
                        <div class="row">
                            
                            <div class="text-center">
                                <h2 class="text-black end-date-${EndDateNumber}">DAY:<br>
                                    <b class="end-date-${EndDateNumber}">${zero.toString()}${index +1}</b>
                                </h2>
                            </div>

                            <div class="text-center">
                            </div>
                        </div>    
                    </div>

                    <div class="col-10 text-white">
                        <div class="end-date-${EndDateNumber}">${EventDate}</div>
                        <div class="end-date-${EndDateNumber}">${Title}</div>
                        <div class="end-date-${EndDateNumber}">${Breakfast ? '<b>Breakfast: </b>' + Breakfast.toUpperCase() : ''}</div>
                        <div class="end-date-${EndDateNumber}">${Lunch ? '<b>Lunch: </b>' + Lunch.toUpperCase() : ''}</div>
                        <div class="end-date-${EndDateNumber}">${Dinner ? '<b>Dinner: </b>' + Dinner.toUpperCase() : ''}</div>
                        <div class="end-date-${EndDateNumber}">${Notes ? '<b>Notes: </b>' + Notes.toUpperCase() : ''}</div>
                    </div>
                </div>
            </div>
        </div>`)

        setTimeout(() => {
            console.info(EndDate)
            console.info(new Date())
            console.info(EndDate < new Date())
            if ( EndDate < new Date() ){
                Array.from(document.querySelectorAll(`.end-date-${EndDateNumber}`)).forEach(el => {
                    $(el).attr('style', 'text-decoration: line-through;')
                })
            }
        }, index *1000)
    })
}

window.onload = init;