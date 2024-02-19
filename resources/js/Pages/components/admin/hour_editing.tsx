import { useState } from 'react'
import { hourStore } from '../../../data/store/api_data.store'
import styles from '../../../../css/admin.module.css'
import React from 'react'
import type { HourDataType } from 'types/data_api_types'

export default function HourEditing() {
  const [errorHour, setErrorHour] = useState(false)
  const [hoursEdit, setHoursEdit] = useState(false)

  const [hours, setHour] = hourStore((state) => [state.hours, state.setHours])

  function editionFinished() {
    setHoursEdit(false)
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('table tr input')
    inputs.forEach((input) => {
      const element = document.createElement('td')
      element.innerText = input.value
      ;(input as Node).parentNode!.replaceChild(element, input)
      const childs = (element as Node).parentNode!.children
      element.addEventListener('click', (e: MouseEvent) => {
        editingHours(
          e! as unknown as React.MouseEvent<HTMLElement>,
          (e!.target as HTMLElement).textContent,
          (element as Node).parentNode!.firstChild!.textContent,
          childs[1] === element ? 'lunch' : 'dinner'
        )
        setHoursEdit(true)
      })
    })
  }

  function editingHours(
    event: React.MouseEvent<HTMLElement>,
    text: string | null,
    day: string | null,
    time: string | null
  ) {
    const element: HTMLInputElement = document.createElement('input')
    element.classList.add(time as string)
    element.setAttribute('id', day as string)
    element.onkeydown = (e) => {
      if (e.code === 'Enter') {
        submitHourEdition(document.querySelectorAll('article table tbody input'))
      }
    }
    element.value = text as string
    ;(event!.target as HTMLElement).parentNode!.replaceChild(element, event!.target as HTMLElement)
  }

  async function submitHourEdition(elem: NodeListOf<HTMLInputElement>) {
    const data: Array<object> = []
    for (let index = 0; index < elem.length; index++) {
      const element = elem[index]
      const day = elem[0].parentElement!.firstChild!.textContent
      const time = element.getAttribute('class')
      data.push({ day: day, time: time, target: element.value })
    }

    let hourRegexTesting
    for (const inputs of elem) {
      const hourRegexe = new RegExp(
        /^(fermer)|([0-1][0-9]|2[0-4])h([1-5][0-9]|60|0[1-9]|[1-9]0)? - ([0-1][0-9]|2[0-4])h([1-5][0-9]|60|0[1-9]|[1-9]0)?$/dgim
      )
      hourRegexTesting = hourRegexe.test(inputs.value)
    }
    if (hourRegexTesting) {
      setErrorHour(false)
      const response = fetch('/admin/hoursEdition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          data,
        }),
      })

      // eslint-disable-next-line unicorn/no-await-expression-member
      if ((await response).ok) {
        response.then((r) => r.json()).then((hour) => setHour(hour.hours))
        editionFinished()
      } else {
        setErrorHour(true)
      }
    } else setErrorHour(true)
  }

  return (
    <>
      <h1>Horaires d&#39;ouvertures</h1>
      <p>(Cliquez sur les horaires pour les éditer)</p>
      <p className={errorHour ? 'format' : ''}>
        Format horaires, exemples : <br />
        12h - 15h, 12h30 - 15h10, fermer
      </p>
      <table>
        <thead>
          <tr>
            <td>jour</td>
            <td>midi</td>
            <td>soir</td>
          </tr>
          <tr>
            <td></td>
            <td>ouverture-fermeture</td>
            <td>ouverture-fermeture</td>
          </tr>
        </thead>
        <tbody>
          {hours?.map((elem, id) => {
            return (
              <tr key={id}>
                <>
                  <td>{elem.day}</td>
                  <td
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      editingHours(e, (e.target as HTMLElement).textContent, elem.day, 'lunch')
                      setHoursEdit(true)
                    }}
                  >
                    {elem.lunch}
                  </td>
                  <td
                    onClick={(e) => {
                      editingHours(e, (e.target as HTMLElement).textContent, elem.day, 'dinner')
                      setHoursEdit(true)
                    }}
                  >
                    {elem.dinner}
                  </td>
                </>
              </tr>
            )
          })}
        </tbody>
      </table>
      {hoursEdit ? (
        <div className={styles.ctaEditHours}>
          <button
            onClick={() =>
              submitHourEdition(document.querySelectorAll('article table tbody input'))
            }
          >
            <p>Édition finit</p>
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
              style={{ color: 'white' }}
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M7 17V9.93L13.93 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8.93L14.07 17H7z"></path>
              <path d="M9 15h4.24l7.2-7.2-4.24-4.24-7.2 7.2zM22.91 2.49 21.5 1.08c-.78-.78-2.05-.78-2.83 0l-1.06 1.06 4.24 4.24 1.06-1.06c.79-.78.79-2.05 0-2.83z"></path>
            </svg>
          </button>
        </div>
      ) : null}
    </>
  )
}
