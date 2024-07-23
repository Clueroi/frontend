import { MapPin, Calendar, Settings2, ArrowRight, X } from "lucide-react";
import { Button } from "../../../components/button";
import { useState } from "react";
import { DateRange, DayPicker } from "react-day-picker";
import 'react-day-picker/dist/style.css'
import { format } from "date-fns";

interface DestinationAndDateStepsProps {
  isGuestsInputOpen: boolean
  closeGuestInput: () => void
  openGuestInput: () => void
  setDestination: (destination: string)=> void
  setEventStartEnd: (dates: DateRange | undefined) => void
  eventStartEnd:DateRange | undefined
}

export function DestinationAndDateSteps({ isGuestsInputOpen, closeGuestInput, openGuestInput, setDestination, setEventStartEnd, eventStartEnd }: DestinationAndDateStepsProps) {

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  
  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }
  
  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }
  
  const displayedDate = eventStartEnd && eventStartEnd.from && eventStartEnd.to
  ? format(eventStartEnd.from, "d 'de ' LLL").concat(' até ').concat( format(eventStartEnd.to, "d 'de' LLL") )
  : null

  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center gap-3">
      <div className='flex gap-2 flex-1'>
        <MapPin className='size-5 text-zinc-400' />
        <input 
        disabled={isGuestsInputOpen} 
        className="bg-transparent placeholder-zinc-400 flex outline-none flex-1" 
        type="text" 
        placeholder="Para onde você vai?" 
        onChange={(event)=>{setDestination(event.target.value)}}
        />
      </div>

      <button onClick={openDatePicker} className='flex gap-2 items-center outline-none text-left w-60'
        disabled={isGuestsInputOpen}
      >
        <Calendar className='size-5 text-zinc-400' />
        <span
          className=' text-zinc-400 w-40 flex-1'
        >
          {displayedDate || 'Quando?'}
        </span>
      </button>
      {isDatePickerOpen && (
      <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
        <div className=' rounded-xl py-5 px-6 bg-zinc-900 space-y-5'>
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <h2 className=' text-lg font-semibold'>Selecione a data</h2>
              <button onClick={closeDatePicker}><X className='size-5 text-zinc-400' /></button>
            </div>
          </div>

          <DayPicker mode="range" selected={eventStartEnd} onSelect={setEventStartEnd} />

        </div>
      </div>
      )}

      <div className='w-px h-6 bg-zinc-800'></div>

      {isGuestsInputOpen ? (
        <Button
          variant="secondary"
          onClick={closeGuestInput}>
          Alterar local/data <Settings2 className='size-5' />
        </Button>
      ) : (
        <Button onClick={openGuestInput} >
          Continuar <ArrowRight className='size-5' />
        </Button>
      )
      }

    </div>
  )
}