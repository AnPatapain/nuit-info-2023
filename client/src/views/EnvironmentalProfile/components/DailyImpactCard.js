import { Card, Button, Tooltip } from 'components/ui'
import React, { useState, useRef } from 'react'
import { t } from 'i18next'
import { RiCelsiusFill } from "react-icons/ri";
import { FaCar } from "react-icons/fa";
import { FaBus } from "react-icons/fa";
function DailyCard({ impact }) {
    return (
        <Card
            className="card flex flex-col w-full max-w-[700px] mx-auto my-4 p-4"
            bodyClass="flex flex-col justify-between"
        >
            <h3>{t("impact.impact_points")}: {impact.impact_points}<RiCelsiusFill/></h3>
            <h3>{t('impact.transportation')}</h3>
            <div className='flex flex-col justify-center ml-6'>
                <div className=''>
                    <Tooltip
                        title={t('impact.public_transport_km')}
                        placement='right'
                    >
                        <FaBus className='text-2xl'/>
                    </Tooltip>
                    <p>{impact.transportation.public_transport_km}</p>
                </div>
                <div>
                    <h4>{t('impact.walking_km')}</h4>
                    <p>{impact.transportation.walking_km}</p>
                </div>
                <div>
                    <h4>{t('impact.car_km')}</h4>
                    <p>{impact.transportation.car_km}</p>
                </div>
            </div>
            <h3>{t('impact.energy')}</h3>
            <div className='flex flex-col justify-center ml-6'>
                <div>
                    <h4>{t('impact.air_conditioner_hour')}</h4>
                    <p>{impact.energy.air_conditioner_hour}</p>
                </div>
                <div>
                    <h4>{t('impact.lighting_hour')}</h4>
                    <p>{impact.energy.lighting_hour}</p>
                </div>
            </div>
            <h3>{t('impact.digital_habit')}</h3>
            <div className='flex flex-col justify-center ml-6'>
                <div>
                    <h4>{t('impact.delete_spam_email_numbers')}</h4>
                    <p>{impact.digital_habit.delete_spam_email_numbers}</p>
                </div>
                <div>
                    <h4>{t('impact.eco_search_engine_hour')}</h4>
                    <p>{impact.digital_habit.eco_search_engine_hour}</p>
                </div>
            </div>
        </Card>
    )
}

export default DailyCard
