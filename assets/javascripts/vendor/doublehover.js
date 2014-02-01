/*
Функция для одновременной подсветки ссылок с одинаковым href,
на вход принимает:
1) selector — джеквери-селектор ссылок, чтобы
была возможность включить дублирующую подсветку в определённом фрагменте;
2) hoverClass — какой класс добавить по ховеру и псевдо-ховеру.
 
Инициализация для всего документа:
doubleHover('a', 'hover');
 
В ЦСС нужно приравнять .hover к :hover:
a:hover, a.hover {
  color: red;
}
a:hover img, a.hover img {
  opacity: .75;
}
*/
 
var doubleHover = function(selector, hoverClass) {
  $(document).on('mouseover mouseout', selector, function(e) {
    $(selector)
      .filter('[href="' + $(this).attr('href') + '"]')
      .toggleClass(hoverClass, e.type == 'mouseover');
  });
}