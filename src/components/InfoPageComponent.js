import React from 'react'

function InfoPageComponent () {
  return (
        <div>
            <p>Tänne tulee tietoa sovelluksesta.</p>
            <h2>Tiedossa olevat bugit</h2>
            <ul>
              <li>Jos listanäkymässä on enemmän kuin yksi tyhjä lista, niin valittaessa uusi näytettävä lista pudotusvalikosta, se lisätään ensimmäiseen tyhjään listaan vasemmalta katsoen.</li>
              <li>DnD-ominaisuuden käyttäminen rikkoo listajärjestyksen, jos hakuehtoja on voimassa.</li>
            </ul>
        </div>
  )
}

export default InfoPageComponent
