$(document).ready(() => {

    $(".chatbot-button img").on('click', (e) => {

        if ($('.chatbot-button img').attr('src') === 'images/question.png') {

            // Display chatbot
            $('.chatbot-content').removeClass('d-none');
            $('.chatbot-content').addClass('d-flex');

            // Change image in the button
            $('.chatbot-button img').attr('src', 'images/close.png');

        } else {

            // Hide chatbot
            $('.chatbot-content').removeClass('d-flex');
            $('.chatbot-content').addClass('d-none');

            // Change image in the button
            $('.chatbot-button img').attr('src', 'images/question.png');

        }

    });
});