import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    FormItem,
    FormContainer,
    toast,
    Notification,
    Dialog,

} from 'components/ui'
import blobUrlToFile from 'utils/blobUrlToFile'
import { Field, Form, Formik, useField } from 'formik'
import { HiOutlineUser } from 'react-icons/hi'
import { BsFillImageFill } from "react-icons/bs";
import * as Yup from 'yup'
import { FaGithub, FaStackOverflow } from "react-icons/fa";
import { t } from 'i18next'
import FormRow from './FormRow'
import { apiCreateNewDailyFact } from 'services/FactService'
const validationSchema = Yup.object().shape({
    public_transport_km: Yup.number().required(t('validation.required')),
    walking_km: Yup.number().required(t('validation.required')),
    car_km: Yup.number().required(t('validation.required')),
})
const NewIdeaForm = ({ opened, onClose }) => {
    const onSubmit = async (formValue, setSubmitting) => {
        setSubmitting(true)
        const {
            public_transport_km,
            walking_km,
            car_km,
            air_conditioner_hour,
            lighting_hour,
            delete_spam_email_numbers,
            eco_search_engine_hour,
        } = formValue

        const data = {
            "transportation": {
                public_transport_km,
                walking_km,
                car_km
            },
            "energy": {
                air_conditioner_hour,
                lighting_hour
            },
            "digital_habit": {
                delete_spam_email_numbers,
                eco_search_engine_hour
            }
        }


        try {
            // TODO: Change api
            const res = await apiCreateNewDailyFact(data);
            if (res.status === 201 || res.status === 200) {

                toast.push(<Notification title={t('fact.fact_posted')} type="success" />, {
                    placement: 'top-center',
                })
            }
        } catch (error) {
            toast.push(<Notification title={error.response.data.message} type="danger" />, {
                placement: 'top-center',
            })
        }
        setSubmitting(false)
    }

    return (
        <Dialog
            isOpen={opened}
            onClose={onClose}
            title='New Daily Fact'
            className='w-full max-w-[600px]'
        >
            <h4>{t("fact.share_your_daily_fact")}</h4>
            <div className='mt-4 max-h-[600px] overflow-y-auto'>
                <Formik
                    initialValues={{
                        "public_transport_km": 0,
                        "walking_km": 0,
                        "car_km": 0,
                        "air_conditioner_hour": 0,
                        "lighting_hour": 0,
                        "delete_spam_email_numbers": 0,
                        "eco_search_engine_hour": 0
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        onSubmit(values, setSubmitting);
                    }}
                >
                    {({ touched, errors, values, isSubmitting }) => {
                        return (
                            <Form>
                                <FormContainer className="">
                                    <div>
                                        <h5>{t("impact.transportation")}</h5>
                                        <div className='pl-6 pt-2'>


                                            <FormItem
                                                label={t("impact.public_transport_km")}
                                                invalid={errors.public_transport_km && touched.public_transport_km}
                                                errorMessage={errors.public_transport_km}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="public_transport_km"
                                                    placeholder={t("asdasd")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label={t("impact.walking_km")}
                                                invalid={errors.walking_km && touched.walking_km}
                                                errorMessage={errors.walking_km}
                                            >
                                                <Field
                                                    type="number"
                                                    autoComplete="off"
                                                    name="walking_km"
                                                    placeholder={t("")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label={t("impact.car_km")}
                                                invalid={errors.car_km && touched.car_km}
                                                errorMessage={errors.car_km}
                                            >
                                                <Field
                                                    type="number"
                                                    autoComplete="off"
                                                    name="car_km"
                                                    placeholder={t("")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>
                                    </div>
                                    <Button block variant="solid" type="submit" loading={isSubmitting}>
                                        {isSubmitting ? t("actions.submitting") : t("actions.submit")}
                                    </Button>
                                </FormContainer>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </Dialog>
    )
}

export default NewIdeaForm
