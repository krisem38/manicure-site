const BOT_TOKEN = '8905763129:AAHFEB7614fOosxtp5yezQUuVqV5bR2CGHI';
const CHAT_ID = '8399502627';

document.getElementById('form').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const service = document.getElementById('service').value;
    const comment = document.getElementById('comment').value;

    // Формируем сообщение
    const message = `📩 *Новая заявка!*

👤 Имя: ${name}
📞 Телефон: ${phone}
📧 Email: ${email || 'не указан'}
💅 Услуга: ${service}
📝 Комментарий: ${comment || 'нет'}`;

    // Кнопка вместо alert
    const btn = document.getElementById('submitBtn');
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        if (response.ok) {
            document.getElementById('status').innerHTML = '✅ Заявка отправлена! Мы свяжемся с вами.';
            document.getElementById('status').style.color = 'green';
            this.reset();
            setTimeout(closeModal, 2000); 
        } else {
            document.getElementById('status').innerHTML = '❌ Ошибка. Попробуйте позже.';
            document.getElementById('status').style.color = 'red';
        }
    } catch (error) {
        document.getElementById('status').innerHTML = '❌ Ошибка соединения. Проверьте интернет.';
        document.getElementById('status').style.color = 'red';
    }

    btn.textContent = 'Отправить заявку';
    btn.disabled = false;
});