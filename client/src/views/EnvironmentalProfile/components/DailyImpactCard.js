import { Card, Button, Tooltip } from 'components/ui'
import React, { useState, useRef } from 'react'
import { t } from 'i18next'
import { RiCelsiusFill } from "react-icons/ri";
import {
    FaCar,
    FaWalking,
    FaBus,
    FaFan
} from "react-icons/fa";
import { GoLightBulb } from "react-icons/go";
import { MdEmail, MdOutlineScreenSearchDesktop } from "react-icons/md";
function DailyCard({ impact }) {
    return (
        <Card
            className="card flex flex-col w-[400px] mx-auto my-4 p-4"
            bodyClass="flex flex-col justify-between"
        >
            <h2 className='flex'>{t("impact.impact_points")}: 
            <span className='flex items-center gap-2'>{impact.impact_points.toFixed(2)}<RiCelsiusFill /></span>
            </h2>
            <h3>{t('impact.transportation')}</h3>
            <div className='flex flex-col justify-center ml-6 my-4 gap-2'>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.public_transport_km')}
                        placement='right'
                    >
                        <FaBus className='text-2xl' />
                    </Tooltip>
                    <p>{impact.transportation.public_transport_km}</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.walking_km')}
                        placement='right'
                    >
                        <FaWalking className='text-2xl' />
                    </Tooltip>
                    <p>{impact.transportation.walking_km}</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.car_km')}
                        placement='right'
                    >
                        <FaCar className='text-2xl' />
                    </Tooltip>
                    <p>{impact.transportation.car_km}</p>
                </div>
            </div>
            <h3>{t('impact.energy')}</h3>
            <div className='flex flex-col justify-center ml-6 my-4 gap-2'>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.air_conditioner_hour')}
                        placement='right'
                    >
                        <FaFan className='text-2xl' />
                    </Tooltip>
                    <p>{impact.energy.air_conditioner_hour}</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.lighting_hour')}
                        placement='right'
                    >
                        <GoLightBulb className='text-2xl' />
                    </Tooltip>
                    <p>{impact.energy.lighting_hour}</p>
                </div>
            </div>
            <h3>{t('impact.digital_habit')}</h3>
            <div className='flex flex-col justify-center ml-6 my-4 gap-2'>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.delete_spam_email_numbers')}
                        placement='right'
                    >
                        <MdEmail className='text-2xl' />
                    </Tooltip>
                    <p>{impact.digital_habit.delete_spam_email_numbers}</p>
                </div>
                <div className='flex items-center gap-4'>
                    <Tooltip
                        title={t('impact.eco_search_engine_hour')}
                        placement='right'
                    >
                        <MdOutlineScreenSearchDesktop className='text-2xl' />
                    </Tooltip>
                    <p>{impact.digital_habit.eco_search_engine_hour}</p>
                </div>
            </div>
        </Card>
    )
}

export default DailyCard
