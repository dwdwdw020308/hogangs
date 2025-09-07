import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

const Content2 = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,       
      easing: 'ease-out',    
      once: false,          
      offset: 0,
    });
    AOS.refresh();
  }, []);

  return (
    <section id="content2">
      <div className="slogan">
        <img  
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="500" 
          data-aos-delay="0"
          src="/about/TitleBox.png" 
          alt="" 
        />
      </div>

      <ul className="texttitle">
        <li data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="150">
          호강스는 ‘반려견도 가족이다’라는 마음으로 시작되었습니다.
        </li>
        <li data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="300">
          우리 아이가 집처럼 편안하게 머물고, 보호자가 안심할 수 있는 공간을 만들고자 합니다.
        </li>
        <li data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="450">
          맞춤형 호텔 서비스와 전문적인 미용을 통해 단순한 돌봄이 아닌 특별한 경험을 제공합니다.
        </li>
        <li data-aos="fade-up" data-aos-duration="500" data-aos-easing="linear" data-aos-delay="600">
          작은 발자국 하나에도 행복이 묻어나는 순간, 호강스는 반려견과 보호자가 함께하는 모든 시간을 더욱 특별하게 만듭니다.
        </li>
      </ul>

      <div 
        className="dogicon"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-duration="500"
        data-aos-delay="750"
      >
        <img src="/about/01.png" alt="" />
        <img src="/about/02.png" alt="" />
        <img src="/about/03.png" alt="" />
      </div>
    </section>
  );
};

export default Content2;
