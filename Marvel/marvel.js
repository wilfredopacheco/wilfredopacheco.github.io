const publicKey = 'fe4d001d953344e520704d034e73c4da';
const url = 'http://gateway.marvel.com/v1/public/characters';
const hash = '9278b5819c79b05b1e8288104e113f32'

let imageLink;
let t = new Date();
let marvelArray = [];
let $offset = 0;
let tools = {
    apikey: publicKey,
    ts: 1,
    hash: hash,
    limit: 15,
    offset: 0
};

Marvel = {
    search: function(str, $Marvel){
        $Marvel = this
        this.getCharacters(url, {
            nameStartsWith: str, 
            apikey: publicKey, 
            ts: 1,
            hash: hash,
        }).done(function(data, status){
            $Marvel.display(data.data.results)
        });
    },
    getCharacters: function(url, data){
        return $.ajax({
            url: url,
            method: 'GET',
            data: data,
            headers: {
                Accept: '*/*'
            },
            success: function(data, status, xhr){
                // console.log(data.data); 
            },
            error:function (res) {
                console.error(res)
            },
            statusCode: {
                404: function(res) {
                    console.log( "page not found" );
                },
                409: function(res) {
                    // console.log(res)
                    console.error( "Marvel Error 409: " + res.responseJSON.message);
                }
              }
        });
    },
    getFavorites: function(){
        return JSON.parse(sessionStorage.getItem('user_fav'));
    },
    setFavorites: function(mObj){
        return sessionStorage.setItem('user_fav', JSON.stringify(mObj))
    },
    clearFavorites: function(user){
        user = this.getFavorites();
        user.list = [];
        sessionStorage.setItem('user_fav', JSON.stringify(user));
        return window.location.reload();
    },
    setFavorite: function(obj){
        try{
            let user_fav = this.getFavorites();
            user_fav.list.push(obj);
            sessionStorage.setItem('user_fav', JSON.stringify(user_fav));
        } catch(e){

        }
    },
    removeFavorite: function(obj){
        // TODO: Remove when unclicked;
        let user_fav = this.getFavorites();
        let index = user_fav.list.findIndex(hero => hero.id === obj.id);
        user_fav.list.splice(index, 1);
        sessionStorage.setItem('user_fav', JSON.stringify(user_fav));
    },
    display: function(data, $Marvel){
        $Marvel = this
        data.forEach(function(hero){
            // This is where the heart is set to false;
            let heart = false;
            try{
            let favArray = $Marvel.getFavorites();
                if(favArray.list.find(fav => fav.id === hero.id)){
                    heart = true;
                }
            } catch(e){

            }
            marvelArray.push(hero);
            // This is where the card is made;
            $(`<div class="uk-card uk-card ${hero.description === "" ? 'uk-width-1-4@m' : 'uk-width-1-3@m'} uk-card-hover uk-card-body animated slideInUp faster" id="Marvel-${hero.id}">
                <img class="uk-border-pill" src="${hero.thumbnail.path}/standard_amazing.${hero.thumbnail.extension}" width="200" height="200" alt="Border pill">
                <h3 class="uk-card-title">${hero.name}</h3>
                <p>${hero.description}</p>
                <div class="heart ${heart === true ? "is-active" : ""} uk-position-top-left" data-marvel-id="${hero.id}"></div>
            </div>`).appendTo('#pills-tabContent');
        });
    },
    getFooter: function(mObj){
        try{
            mObj = this.getFavorites();
            return $(mObj.attributionHTML).appendTo('#footer-link');
        } catch(e){

        }
    },
    getCount: function(user){
        try{
            user = this.getFavorites();
            return $('#hero-count').text(user.list.length);
        } catch(e){

        }
    },
    getAllUsers: function(){
        return JSON.parse(localStorage.getItem(window.location.host))
    },
    init: function($Marvel){
        $Marvel = this;
        $(window).scroll(function() {
            if($(window).scrollTop() + $(window).height() > $(document).height() - 80) {
                tools.offset += tools.limit;
                $Marvel.getCharacters(url, tools).done(function(data, status){
                    $Marvel.display(data.data.results);           
                }); 
            }
         });
        if(window.location.search){
            Marvel.search(window.location.search.split("=")[1]);
        } else {
            // First call is made when the page is loaded;
            $Marvel.getCharacters(url, tools).done(function(data, status, xhr){
                let session = $Marvel.getFavorites();
                data.attributionHTML = data.attributionHTML;
                data.attributionText = data.attributionText;
                $Marvel.setFavorites(session);
                $Marvel.display(data.data.results);
            });
        }
    },
    createProfile: function(username, result){
        let users = [];
        username = $('#username-input').val();
        if(!!localStorage.getItem(window.location.host)){
            users = JSON.parse(localStorage.getItem(window.location.host));
            result = users.find(user => user.username === username);

            if(result === undefined){
                users.push({
                    username: username, 
                    create_date: new Date(),
                    list: [],
                })
                localStorage.setItem(window.location.host, JSON.stringify(users));
                sessionStorage.setItem('MarvelMessage', username);
                window.location.reload();
            } else {
                Marvel.alert("This user already exists, would you like to sign-in?")
            }

        } else {
            users.push({
                username: username, 
                create_date: new Date(),
                list: [],
            })
            localStorage.setItem(window.location.host, JSON.stringify(users));
            sessionStorage.setItem('MarvelMessage', username);
            window.location.reload();
        }
    },
    saveToProfile: function(session, users){
        let holder = [];
        session = this.getFavorites();
        users = this.getAllUsers();
        try{
            users.forEach(function(item){
                if(item.username === session.username){
                    item = session;
                }
                holder.push(item);
            });
            localStorage.setItem(window.location.host, JSON.stringify(holder));
            this.alert('Save successful.');
        } catch(e){
            Marvel.alert('Your changes were not saved, please create an account to start saving favorites.')
        }
    },
    signIn: function(users, user){
        users = this.getAllUsers();
        user = users.find($user => $user.username === $('#user-select').val())
        sessionStorage.setItem('user_fav', JSON.stringify(user));
        window.location.href = './Marvelindex.html';
    },
    signOut: function(session, users){
        session = this.getFavorites();
        users = this.getAllUsers();
        let result = users.find(user => user.username === session.username)
        // this.saveToProfile();
        // TODO: if else to save or alert user;
        if(result.list.length != session.list.length){
            this.alert('Make sure to save changes before signing out.');
        } else {
            sessionStorage.removeItem('user_fav');
            sessionStorage.setItem('MarvelAlert', 'You have been signed out.')
            window.location.href = './MarvelLogin.html';
        }
    },
    alert: function(msg){
        // return $(`<div uk-alert class="uk-width-1-3 uk-align-center uk-margin-top uk-animation-fade">
        // <a class="uk-alert-close" uk-close></a>
        // <h3 class="uk-text-danger uk-text-center">Notice</h3><p class="uk-text-danger uk-text-center">${msg}</p></div>`).prependTo('main');
        return $(`<div uk-alert class="uk-width-1-3 uk-align-center uk-margin-top uk-animation-fade">
        <a class="uk-alert-close" uk-close></a>
        <h3 class="uk-text-danger uk-text-center"></h3><p class="uk-text-danger uk-text-center">${msg}</p></div>`).prependTo('main');
    }
}
let $session = Marvel.getFavorites();
if($session === null){
    $('#sign-out-element, #user-save-element, #favorites-element, #clear-element, #save-element, #clear-element').hide();
} else {
    $('#sign-out-element, #user-save-element, #favorites-element, #clear-element').show();
    $('#sign-in-element').hide();
}
$(document).on('click', function(e){
    let session = Marvel.getFavorites();
    let $element = $(e.target);
    if(!!sessionStorage.getItem('user_fav')){
        if($element.hasClass('heart')){
            let $$id = $element.parent().attr('id');
            if(session === null){
                $('#' + $$id).append('<p class="uk-text-danger">Login or create a profile to save favorites.</p>');
            }
            $element.toggleClass("is-active");
            let $id = Number($element.attr('data-marvel-id'));
            let result = marvelArray.find(hero => hero.id === $id);
            if($element.hasClass('is-active')){
                Marvel.setFavorite(result);
            } else {
                Marvel.removeFavorite(result);
            }
            Marvel.getCount();
        }
    }
    if($element.hasClass('uk-card')){
        try{
            let $id = Number(($element).attr('id').split("-")[1]);
            let found = marvelArray.find(hero => hero.id === $id);
            $('#modal-links').empty();
            $('#modal-title').text(found.name);
            $('#modal-body').empty();
            $('#modal-body').text(found.description === "" ? "No Description Available." : found.description);
            found.urls.forEach(function(linkObj){
                $(`<li><a target="_blank" href="${linkObj.url}">${linkObj.type}</a></li>`).appendTo('#modal-links')
            });
            $('#modal-btn').click();
        } catch(e){
            // console.log(e)
        }
    }
});

$('#clear-favorites').click(function(e){
    Marvel.clearFavorites();
});
$('#user-save').click(function(e){
    Marvel.saveToProfile();
});
$('#sign-out-btn').click(function(e){
    Marvel.signOut();
});

Marvel.getFooter();
