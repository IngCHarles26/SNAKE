import { difficulty } from '../../assets/paremeters';
import { images, options } from '../../images/images';
import ChoiseDiff from './children/ChoiseDiff';
import './landing.css'

function Landing() {
  

  return (
    <div className='main-landing'>
      <header>
        <img src={images.hero} alt="imagen-hero" />
        <p>SNAKE</p>
      </header>

      <section className='option-landing'>
        <p>Select difficulty</p>
        <div className="container-option-landing">
          {
            options.map((url,ix)=>
              <ChoiseDiff 
                key={ix+' optionImage'}
                url={url}
                diff = {difficulty[ix]}
              />)
          }
        </div>


      </section>

      <footer>
        <p>Special thanks to: Taneli Armanto</p>
        <p>CarlosCo_Dev</p>
      </footer>
    </div>
  );
}

export default Landing;