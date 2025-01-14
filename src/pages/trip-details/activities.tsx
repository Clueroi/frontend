import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { UpdateAndDeleteActivityModal } from "./modal/update-and-delete-activity-modal";

interface Activity {
  date: string;
  activities: {
    id: string;
    title: string;
    occurs_at: string;
  }[]
}

export function Activities() {
  const { tripId } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])
  
  const [openEditModal, setOpenEditModal] = useState(false)
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [editId, setEditId] = useState<string>('')

  function openModal(id:string){
    setEditId(id)
    setOpenEditModal(true)
  }
  function closeModal(){
    setEditId('')
    setOpenEditModal(false)
  }
  
  
    useEffect(() => {
      api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])
  return (
    <div className="space-y-8">
      {activities.map(category => {
        return (
          <div key={category.date} className="space-y-2.5">
            <div className="flex gap-2 items-baseline">
              <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
              <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })} </span>
            </div>
            {category.activities.length > 0 ? (
              <div>
                {category.activities.map(activity => {
                  return (
                    <div key={activity.id} className="space-y-2.5">
                      <div onMouseEnter={()=>setIsHovered(activity.id)} onMouseLeave={()=>setIsHovered(null)} className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3 hover:">
                        <CircleCheck className="size-5 text-lime-300" />
                        <span className="text-zinc-100">{activity.title}</span>
                        <span className="text-zinc-400 text-sm ml-auto">
                          {format(activity.occurs_at, 'HH:mm')}h
                        </span>
                        {isHovered === activity.id && (
                          <span onClick={()=>{openModal(activity.id)}} >...</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
            )}
          </div>
        )
      })}
      {openEditModal && (
        <UpdateAndDeleteActivityModal
        closeUpdateModal={closeModal}
        activityId={editId}
        />
      )}
    </div>
  )
}