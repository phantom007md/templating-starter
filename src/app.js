import  $ from 'jquery';
import 'bootstrap';

window.Popper = import ('popper.js').default;
window.$  = $;

$('[data-toggle="tooltip"]').tooltip({
    delay:{ show: 100, hide: 300},
})

$('[data-toggle="popover"]').popover()


