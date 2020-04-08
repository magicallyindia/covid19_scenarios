import React from 'react'
import { Field, FieldProps } from 'formik'
import { Range, getTrackBackground } from 'react-range'
import HelpLabel from './HelpLabel'

import { Tuple } from '../../algorithms/types/Param.types'

export interface RangeSliderProps {
  identifier: string
  label: string
  help?: string | React.ReactNode
  step: number
  min: number
  max: number
}

export function RangeSlider({ identifier, label, help, step, min, max }: RangeSliderProps) {
  return (
    <Field name={identifier}>
      {({ field: { value, onChange }, form: { setFieldValue } }: FieldProps<Tuple>) => {
        const handleChange = (value: Tuple) => {
          setFieldValue(identifier, value)
        }
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'row',
              height: '40px',
            }}
          >
            <div id={identifier} style={{ width: '100%', justifyContent: 'left' }}>
              <HelpLabel identifier={identifier} label={label} help={help} />
            </div>

            <Range
              values={value}
              step={step}
              min={min}
              max={max}
              onChange={handleChange}
              renderTrack={({ props, children }) => (
                <div
                  onMouseDown={props.onMouseDown}
                  onTouchStart={props.onTouchStart}
                  style={{
                    ...props.style,
                    height: '24px',
                    display: 'flex',
                    width: '100%',
                  }}
                >
                  <div
                    ref={props.ref}
                    style={{
                      height: '8px',
                      width: '80%',
                      borderRadius: '4px',
                      background: getTrackBackground({
                        values: value,
                        colors: ['#ccc', 'mediumaquamarine', '#ccc'],
                        min: min,
                        max: max,
                      }),
                      alignSelf: 'center',
                    }}
                  >
                    {children}
                  </div>
                  <div style={{ width: '40%', paddingLeft: '20px', justifyContent: 'right' }}>
                    <output>
                      {value[0].toFixed(1)} - {value[1].toFixed(1)}
                    </output>
                  </div>
                </div>
              )}
              renderThumb={({ props, isDragged }) => (
                <div
                  style={{
                    ...props.style,
                    height: '17px',
                    width: '17px',
                    borderRadius: '4px',
                    backgroundColor: '#FFF',
                    borderWidth: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0px 2px 6px #AAA',
                  }}
                >
                  <div
                    style={{
                      height: '10px',
                      width: '5px',
                      backgroundColor: isDragged ? 'mediumaquamarine' : '#CCC',
                    }}
                  />
                </div>
              )}
            />
          </div>
        )
      }}
    </Field>
  )
}
