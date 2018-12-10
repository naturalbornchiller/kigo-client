/* eslint-disable indent */
const resourceApi = require('./resourceApi.js')
const resourceUi = require('./resourceUi.js')
const formRenderer = require('../formRenderer.js')

const onLoadRandomResource = () => {
    resourceApi.loadRandomResource()
        .then(resourceUi.onLoadRandomResourceSuccess)
        .catch(console.error)
}

const onDriftArrow = e => {
    e.preventDefault()
    resourceApi.loadRandomResource()
        .then(resourceUi.onDriftArrowSuccess)
        .then(console.error)
}

const onPublishHaiku = e => {
    e.preventDefault()
    let data = { haiku: { title: '', content: '' } }
    const line1 = $('#line-1').val()
    const line2 = $('#line-2').val()
    const line3 = $('#line-3').val()
    data.haiku.content = `${line1}/${line2}/${line3}`
    if (!formRenderer.validateHaiku(line1, line2, line3)) data = undefined
    resourceApi.publishHaiku(data)
        .then(resourceUi.onPublishHaikuSuccess)
        .catch(resourceUi.onPublishHaikuFailure)
}

const onShowMyHaiku = () => {
    resourceApi.showMyHaiku()
        .then(resourceUi.onShowMyHaikuSuccess)
        .catch(console.error)
}

const onRemoveHaiku = e => {
    e.preventDefault()
    const dataId = $(event.target).closest('section').data('id')
    resourceApi.removeHaiku(dataId)
      .then(() => onShowMyHaiku())
      .then(resourceUi.onRemoveHaikuSuccess)
      .catch(resourceUi.onRemoveHaikuFailure)
}

const onViewHaiku = e => {
    e.preventDefault()
    const dataId = $(event.target).closest('section').data('id')
    resourceApi.viewHaiku(dataId)
      .then(resourceUi.onViewHaikuSuccess)
      .catch(resourceUi.onViewHaikuFailure)
}

/*
const haikuStandardizer = (...lines) => {
    const syllable = require('syllable')
    if (syllable(lines[0]) < 4 || syllable(lines[0]) > 6) {

    }
}
*/

module.exports = {
    onLoadRandomResource,
    onDriftArrow,
    onPublishHaiku,
    onShowMyHaiku,
    onRemoveHaiku,
    onViewHaiku
}
