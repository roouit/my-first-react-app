import React from 'react'
import './InfoPageComponent.css'

function InfoPageComponent () {
  return (
    <div className='info-wrapper'>
      <h1>Tietoa sovelluksesta</h1>
      <h3>Yleistä</h3>
      <ul>
        <li>Tekijä: Roope Uitto</li>
        <li>Sisältö: todo-sovellus harjoitustyönä React-kurssille</li>
      </ul>
      <h3>Käyttöohjeet</h3>
      <ul>
        <li>
          <i>Todo-elementit</i>
        </li>
        <ul>
          <li>Lisääminen tekstikentästä Aloitus- tai Listat-näkymässä</li>
          <li>Poistaminen elementin oikeasta yläkulmasta roskakori-ikonista</li>
          <li>
            Muokkaamisnäkymä aukeaa elementin oikeasta yläkulmasta kynä-ikonista
          </li>
          <ul>
            <li>Muokatut tiedot tallentuvat Tallenna-painikkeesta</li>
            <li>
              Tageja voi lisätä kirjoittamalla sen nimi ja painamalla Enter
            </li>
            <li>Tageja voi poistaa klikkaamalla sen nimeä</li>
          </ul>
        </ul>
        <br></br>
        <li>
          <i>Lista-elementit</i>
        </li>
        <ul>
          <li>Lisääminen navigointipalkin tekstikentästä</li>
          <li>Poistaminen listan nimen oikealta puolelta roskakori-ikonista</li>
          <li>
            Muokkaamisnäkymä aukeaa listan nimen oikealta puolelta kynä-ikonista
          </li>
        </ul>
        <br></br>
        <li>
          <i>Haku ja järjestäminen</i>
        </li>
        <ul>
          <li>
            Todo-elementeistä voi hakea tagin (esim. #koti) tai tekstin (esim.
            puhelin) perusteella kirjoittamalla hakukenttään Aloitus- tai
            Listat-näkymässä
          </li>
          <ul>
            <li>
              Kriteerejä voi lisätä kirjoittamalla sen nimi ja painamalla Enter
            </li>
            <li>Kriteerejä voi poistaa klikkaamalla sen nimeä</li>
          </ul>
          <li>
            Todo-elementit voi järjestää automaattisesti muokkausajan mukaan
            ruksaamalla kyseisen valintaruudun
          </li>
          <li>
            Todo-elementtejä voi uudelleenjärjestää raahaamalla ja tiputtamalla
            (DnD) niitä samaan tai toiseen listaan
          </li>
        </ul>
        <br></br>
        <li>
          <i>Muuta</i>
        </li>
        <ul>
          <li>
            Listat-näkymän yläreunasta voi valita kuinka monta listaa haluaa
            nähdä
          </li>
          <ul>
            <li>
              Alaspudotusvalikosta voi valita haluamansa listan
              vapaavalintaiseen kohtaan
            </li>
          </ul>
          <li>
            Kalenterista voi vain katsella todo-elementtejä, joille on asetettu
            hälytys
          </li>
          <li>
            Jos todo-elementtile on asetettu hälytys, niin siitä ilmoitetaan
            sovelluksen yläreunassa popup-ikkunalla
          </li>
        </ul>
      </ul>
      <h3>Tiedossa olevat bugit</h3>
      <ol>
        <li>
          Jos listanäkymässä on enemmän kuin yksi tyhjä lista, niin valittaessa
          uusi näytettävä lista pudotusvalikosta, se lisätään ensimmäiseen
          tyhjään listaan vasemmalta katsoen.
        </li>
        <li>
          DnD-ominaisuuden käyttäminen rikkoo listajärjestyksen, jos hakuehtoja
          on voimassa.
        </li>
      </ol>
      <h3>Lisenssit ja materiaalien oikeudet</h3>
      <ul>
        <li>
          Ikonit (<a href='https://remixicon.com/'>Remix Icon</a>)
        </li>
        <ul>
          <li>Ei lisenssiä, vapaa käyttö</li>
          <li>Navigaatiopalkin ikonit (Aloitus, Listat ja Tietoa)</li>
          <li>Poisto ja muokkaus ikonit</li>
          <li>Hälytys ikoni todo-elementeissä hälytysajan vieressä</li>
        </ul>
        <li>
          Kalenteri (<a href='https://fullcalendar.io/'>FullCalendar</a>)
        </li>
        <ul>
          <li>Lisenssi: MIT (Standard ilmaisversio)</li>
        </ul>
        <li>Kaikki muu sovelluksessa näkyvä on itse tehty</li>
      </ul>
    </div>
  )
}

export default InfoPageComponent
