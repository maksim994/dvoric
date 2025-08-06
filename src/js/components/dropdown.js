document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector('.dropdown-button');

        button.addEventListener('click', function() {
            // Переключаем класс active для показа/скрытия меню
            dropdown.classList.toggle('active');
        });

        // Закрытие меню при клике вне элемента
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });
});