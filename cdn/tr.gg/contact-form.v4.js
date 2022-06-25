function ContactFormInit() {
   if ($("#contactForm").length > 0 && window.location.hash.includes('contact')) {
      if (document.querySelector("#contactForm").classList.contains("initalized")) return;
      document.querySelector("#contactForm").classList.add("initalized");
      
        console.info("Form kuruldu!");

        $("#contactForm").validate({
            rules: {
                name: "required",
                subject: "required",
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true,
                    minlength: 5
                }
            },
            messages: {
                name: "Lütfen adınızı yazınız.",
                subject: "Mesaj konusu zorunludur.",
                email: "E-posta adresi zorunludur.",
                message: "Mesaj zorunludur."
            },

            submitHandler: function (form) {
                var $submit = $('.submitting'),
                    waitText = 'Gönderiliyor...';

                $.ajax({
                    type: "POST",
                    url: "https://formspree.io/f/mjvldewk",
                    data: $(form).serialize(),

                    beforeSend: function () {
                        $submit.css('display', 'block').text(waitText);
                    },

                    success: function (res) {
                        if (res.ok) {
                            $('#form-message-warning').hide();
                            $('#form-message-success').html("Mesajınızı aldık, bizimle iletişime geçtiğiniz için teşekkürler!");

                            setTimeout(function () {
                                $('#contactForm').fadeIn();
                            }, 1000);
                            
                            setTimeout(function () {
                                $('#form-message-success').fadeIn();
                            }, 1400);

                            setTimeout(function () {
                                $('#form-message-success').fadeOut();
                            }, 8000);

                            setTimeout(function () {
                                $submit.css('display', 'none').text(waitText);
                            }, 1400);

                            setTimeout(function () {
                                $('#contactForm').each(function () {
                                    this.reset();
                                });
                            }, 1400);

                        } else {
                            $('#form-message-warning').html(res.errors ? res.errors.map(e => e.message).join() : res.error ? res.error : "Bilinmeyen bir hata oluştu!");
                            $('#form-message-warning').fadeIn();
                            $submit.css('display', 'none');
                        }
                    },

                    error: function () {
                        $('#form-message-warning').html("Bir hata oluştu, mesajınız gönderilemedi.");
                        $('#form-message-warning').fadeIn();
                        $submit.css('display', 'none');
                    }
                });
            }

        });
    }
   
   setInterval(ContactFormInit, 3000);
}

window.addEventListener("hashchange", ContactFormInit);
ContactFormInit();
