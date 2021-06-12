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
            Title: 'Arrive | Check in @ 4',
            Dinner: '🍔 🍟'
        }, {
            EventDate: 'Monday June 14',
            Title: 'Lake Day',
            Breakfast: 'carne guisada tacos',
            Lunch: 'on own',
            Dinner: '🍝 🥗 '
        }, {
            EventDate: 'Tuesday June 15',
            Title: 'Magnolia girls day Trip',
            Breakfast: 'muffins and fruit',
            Lunch: 'on own',
            Dinner: 'order 🍕 or order elsewhere',
            Notes: 'pick up nuggets for next day'
        }, {
            EventDate: 'Wednesday June 16',
            Title: 'lake or whatever you want day',
            Breakfast: 'chicken and waffles',
            Lunch: 'on own',
            Dinner: 'Lemon chicken, wontons, rice, egg drop soup'
        }, {
            EventDate: 'Thursday June 16',
            Title: 'Departure | checkout @ 11',
            Breakfast: 'together @ waffle street'
        }    
    ]
    
    const OTHER = `
    * there will be sandwich stuff and ramen for anyone 
    * Bring your drinks and snacks 
    `
    document.body.style.backgroundImage = `url(${ImageLink})`
    document.body.style.backgroundSize = 'cover'
    // $(document.body).attr('style', `background-image: ${ImageLink}`)
    
    $(MainElement).addClass('p-5')
    .addClass('m-5')
    .addClass('container')
    .addClass('mx-auto')

    $(MainElement).append(`<!-- Title -->
    <div class="col-12 display-4 mb-3 text-white"
        >${Title}
    </div>`)

    TripDetails.forEach(function(day, index){

        const {
            EventDate,
            Title,
            Breakfast,
            Lunch,
            Dinner,
            Notes,
        } = day;

        const zero = index < 10 ? 0 : ''

        $(MainElement).append(`<!-- Cards -->
        <div class="card mb-2" style="background-color: ${Colors[index]};">
            <div class="card-body">
                <div class="row">

                    <div class="ml-5 p-3 col border d-flex justify-content-center bg-white">
                        <div class="row">
                            
                            <div class="text-center">
                                <h2 class="text-black">DAY:<br>
                                    <b>${zero.toString()}${index +1}</b>
                                </h2>
                            </div>

                            <div class="text-center">
                            </div>
                        </div>    
                    </div>

                    <div class="col-10 text-white">
                        <div>${EventDate}</div>
                        <div>${Title}</div>
                        <div>${Breakfast ? '<b>Breakfast: </b>' + Breakfast.toUpperCase() : ''}</div>
                        <div>${Lunch ? '<b>Lunch: </b>' + Lunch.toUpperCase() : ''}</div>
                        <div>${Dinner ? '<b>Dinner: </b>' + Dinner.toUpperCase() : ''}</div>
                        <div>${Notes ? '<b>Notes: </b>' + Notes.toUpperCase() : ''}</div>
                    </div>
                </div>
            </div>
        </div>`)
    })

    // TODO: Add NOTES/OTHER;
}

window.onload = init;