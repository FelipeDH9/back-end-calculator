function setExpressionValue(value) {
  console.log('valor do botao', value)

  // $('#expression').append(value)
}

$(document).ready(function () {
  function calculate(expression) {
    $.post('http://localhost:4731/calculate', { expression }, function (data) {
      alert('success')
    }).fail(function () {
      alert('error')
    })
  }

  // function setExpressionValue(value) {
  //   console.log('valor do botao', value)

  //   $('#expression').append(value)
  // }

  $('.input').on('click', event => {
    var buttonPressed = $(this).html()
    console.log('target', buttonPressed)
  })
  $('#submit').on('click', () => {
    $('#expression').val('0')
  })

  // $('.input').click(data => {
  //   if ($('#expression').val() == 0) {
  //     // $('#expression').val($(this).text())
  //     console.log('texto', data)
  //     return
  //   }
  //   $('#expression').val($('#expression').val() + $(this).text())
  // })
})
