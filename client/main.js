$(document).ready(function () {
  function calculate() {
    const inputValue = $('#userName').val()

    $.ajax({
      url: 'http://localhost:4731/calculate',
      headers: {
        user_id: getCookie('user_id')
      },
      type: 'post',
      data: JSON.stringify({
        expression: String($('#expression').text().trim())
      }),
      dataType: 'json',
      contentType: 'application/json'
    })
      .done(function (data) {
        $('#calculation-result').val(String(data.result))
        getCalculations()
        $('#teste').append(data.result)
      })
      .fail(function (error) {
        alert(error.responseJSON.message)
      })

    $('#expression').text('')
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date()
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
    let expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/'
  }

  function getCookie(cname) {
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ''
  }

  function signIn() {
    const inputValue = $('#userName').val()
    const calculator = $('.calculator')

    $.ajax({
      url: 'http://localhost:4731/signin-create',
      type: 'post',
      data: JSON.stringify({
        name: String($('#userName').val().trim())
      }),
      dataType: 'json',
      contentType: 'application/json'
    })
      .done(function (data) {
        setCookie('user_id', data.id, 1)
        getCalculations()
        calculator.removeClass('hidden')
      })
      .fail(function (error) {
        alert(error.responseJSON.message)
        calculator.addClass('hidden')
      })
  }

  function getCalculations() {
    $.ajax({
      url: 'http://localhost:4731/calculations',
      type: 'get',
      headers: {
        user_id: getCookie('user_id')
      }
    })
      .done(function (data) {
        $('#calculations-data tbody tr').remove()
        data.map(calculation => {
          $('#result').val(calculation.result)
          $('#tbody').append(`
          <tr>
              <td>${moment(calculation.date).format('DD/MM/YYYY hh:mm:ss')}</td>
              <td>${calculation.name}</td>
              <td>${calculation.expression}</td>
              <td>${calculation.result}</td>
            </tr>
          `)
        })
      })
      .fail(function (error) {
        alert(error.responseJSON.message)
        calculator.addClass('hidden')
      })
  }

  $('#signIn').on('click', () => signIn())

  $('#submit').on('click', () => calculate())

  $('#clear').on('click', () => {
    $('#expression').text('')
    $('#calculation-result').val('')
  })

  $('#delete').on('click', () => {
    var expression = $('#expression').text().slice(0, -1)
    $('#expression').text(expression)
  })

  $('.input').on('click', ({ target }) => {
    if ($('#expression').text() == 0) {
      $('#expression').text(target.innerHTML.trim())
      return
    }
    $('#expression').text($('#expression').text() + target.innerHTML.trim())
  })
})
