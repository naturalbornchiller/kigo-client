/* eslint-disable no-unexpected-multiline */
/* eslint-disable func-call-spacing */
/* eslint-disable one-var */
/* eslint-disable indent */
require('jquery-ui-dist/jquery-ui')
const resourceEvents = require('./resources/resourceEvents.js')
const toastr = require('toastr/build/toastr.min')
const store = require('./store.js')

function renderPage () {
    // if new user show 'about' page
    if (store.newUser) {
        renderAboutPage()
    } else { // else show 'homepage'
        renderHomePage()
    }
    loadResourceActions()
    addAccordionToPlus()
    sideNavigation()
}

function sideNavigation () {
    sideNavDrift()
    sideNavWrite()
    sideNavMyHaiku()
}

const sideNavDrift = () => {
    $('#sidenav-drift').on('click', function () {
        $('#current-panel').children().hide('slow').promise().done(function () {
            $('#drift-display').show('slow')
            $('#sidenav-drift').off()
            sideNavWrite()
            sideNavMyHaiku()
        })
    })
}

const sideNavWrite = () => {
    $('#sidenav-write').on('click', function () {
        $('#current-panel').children().hide('slow').promise().done(function () {
            $('#write-display').show('slow')
            $('#sidenav-write').off()
            sideNavDrift()
            sideNavMyHaiku()
        })
    })
}

const sideNavMyHaiku = () => {
    $('#sidenav-myhaiku').on('click', function () {
        $('#current-panel').children().hide('slow').promise().done(function () {
            $('#myhaiku-display').show('slow')
            $('#sidenav-myhaiku').off()
            sideNavWrite()
            sideNavDrift()
            resourceEvents.onShowMyHaiku()
        })
    })
}

function renderAboutPage () {
    setTimeout(function () {
        $('#about').show('fade', 1000)
        $('#nav-search').animate({opacity: '0'}, 400)
        $('#haiku-example').show('fade', 3000)
        $('#nav-poems').on('click', function () {
            $(this).off()
            $('#haiku-example').hide('fade', 1600)
            $('#about').hide('fade', 1500)
            renderHomePage()
        })
    }, 1500)
}

function renderHomePage () {
    setTimeout(function () {
        $('#homepage').show('fade', 1000)
        $('#nav-search').animate({opacity: '1'}, 1000)
        $('#nav-about').on('click', function () {
            $(this).off()
            shrinkAccordion()
            hideOneHaiku()
            $('#homepage').hide('fade', 1500)
            renderAboutPage()
        })
        resourceEvents.onLoadRandomResource()
    }, 1500)
}

function hideOneHaiku () {
    $('#one-haiku-title').hide('slide', {direction: 'right'}, 500)
    $('#one-haiku-content').hide('slide', {direction: 'right'}, 500)
    $('#one-haiku-author').hide('slide', {direction: 'right'}, 500)
}

function shrinkAccordion () {
    $('.plus-minus-super-container').removeClass('opened')
    $('#sidebar').hide('slide', {direction: 'right'}, 600)
    $('#sidenav').hide('slide', {direction: 'right'}, 500)
}

function loadResourceActions () {
    $('#drift-arrow').on('click', resourceEvents.onDriftArrow)
    $('#publish').on('click', resourceEvents.onPublishHaiku)
    $('.flex-container, .view-haiku').on('click', '.removePoemButton', resourceEvents.onRemoveHaiku)
    $('.view-haiku').on('click', '.updatePoemButton', function () {
        $('.view-haiku').hide('fast')
        $('.update-haiku').show('slow')
        $('#update-line-1').val(store.haiku[0])
        $('#update-line-2').val(store.haiku[1])
        $('#update-line-3').val(store.haiku[2])
    })
    $('#update').on('click', resourceEvents.onUpdateHaiku)
    $('.flex-container').on('click', '.viewPoemButton', resourceEvents.onViewHaiku)
    $('#back-arrow').on('click', function () {
        $('.view-haiku').hide('fast')
        $('.flex-container').show('slow')
    })
    $('#back-arrow-2').on('click', function () {
        $('.update-haiku').hide('fast')
        $('.view-haiku').show('slow')
    })
}

function addAccordionToPlus () {
    $('.plus-minus-super-container').on('click', function () {
        $(this).toggleClass('opened')
        if (this.classList.contains('opened')) {
            $('#sidebar').show('slide', {direction: 'right'}, 600)
            $('#sidenav').show('slide', {direction: 'right'}, 300)
        } else {
            $('#sidebar').hide('slide', {direction: 'right'}, 600)
            $('#sidenav').hide('slide', {direction: 'right'}, 500)
        }
    })
}

// ALERTS
const changePasswordSuccessAlert = () => toastr.success('Password change went through')
function invalidSubmitAlerts () {
    const emptyFields = !$('#old-password').val() || !$('#new-password').val()
    console.log(emptyFields)

    if (emptyFields) { // alert if fields are empty
        toastr.error('Both fields must be filled out')
    } else if (!store.passwordMismatch) { // alert if passwords match
        toastr.error('New password must actually be new')
    } else { // alert that password is incorrect
        toastr.error('Old password incorrect')
    }
}

module.exports = {
    renderPage,
    invalidSubmitAlerts,
    changePasswordSuccessAlert
}
