"use client"

import { trpc } from "@/trpc/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface PaymentStatusProps {
    orderEmail: string,
    orderId: string,
    _isPaid: boolean,
}
const PaymentStatus = ({orderEmail, orderId, _isPaid}: PaymentStatusProps)=>{

    const router = useRouter()

    const {data} = trpc.payment.pollOrderStatus.useQuery({orderId},{
        enabled: _isPaid === false,
        refetchInterval: (data)=> (data?.isPaid ? false : 1000)
    })

    useEffect(()=>{
        if(data?.isPaid) router.refresh()
    },[data?.isPaid, router])

    return <div className="mt-16 grid grid-cols-2 gap-x-4 text-sm text-gray-600">
        <div>
            <p className="font-medium text-gray-900">Shipping to</p>
            <p>{orderEmail}</p>
        </div>
        <div>
            <p className="font-medium text-gray-900">Order Status</p>
            <p>{_isPaid? "Payment Successful": "Pending Payment"}</p>
        </div>
    </div>
}

export default PaymentStatus