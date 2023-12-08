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
import { Field, Form, Formik, useField } from 'formik'
import * as Yup from 'yup'
import { t } from 'i18next'
import { apiCreateNewDailyImpact } from 'services/DailyImpactService'

const validationSchema = Yup.object().shape({
    public_transport_km: Yup.number().required(t('validation.required')),
    walking_km: Yup.number().required(t('validation.required')),
    car_km: Yup.number().required(t('validation.required')),
    air_conditioner_hour: Yup.number().required(t('validation.required')),
    lighting_hour: Yup.number().required(t('validation.required')),
    delete_spam_email_numbers: Yup.number().required(t('validation.required')),
    eco_search_engine_hour: Yup.number().required(t('validation.required')),
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
            const res = await apiCreateNewDailyImpact(data);
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
                        "public_transport_km": "",
                        "walking_km": "",
                        "car_km": "",
                        "air_conditioner_hour": "",
                        "lighting_hour": "",
                        "delete_spam_email_numbers": "",
                        "eco_search_engine_hour": ""
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
                                                    placeholder={t("public_transport_usage_km")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label={t("impact.walking_km")}
                                                invalid={errors.walking_km && touched.walking_km}
                                                errorMessage={errors.walking_km}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="walking_km"
                                                    placeholder={t("walking_km")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label={t("impact.car_km")}
                                                invalid={errors.car_km && touched.car_km}
                                                errorMessage={errors.car_km}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="car_km"
                                                    placeholder={t("car_usage_km")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>

                                        <h5>{t("impact.electricity_usage")}</h5>
                                        <div className='pl-6 pt-2'>
                                            <FormItem
                                                label={t("impact.air_conditioner_hour")}
                                                invalid={errors.air_conditioner_hour && touched.air_conditioner_hour}
                                                errorMessage={errors.air_conditioner_hour}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="air_conditioner_hour"
                                                    placeholder={t("air_conditioner_usage_hour")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label={t("impact.lighting_hour")}
                                                invalid={errors.lighting_hour && touched.lighting_hour}
                                                errorMessage={errors.lighting_hour}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="lighting_hour"
                                                    placeholder={t("lighting_hour_usage")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                        </div>

                                        <h5>{t("impact.digital_habit")}</h5>
                                        <div className='pl-6 pt-2'>
                                            <FormItem
                                                label={t("impact.delete_spam_email_numbers")}
                                                invalid={errors.delete_spam_email_numbers && touched.delete_spam_email_numbers}
                                                errorMessage={errors.delete_spam_email_numbers}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="delete_spam_email_numbers"
                                                    placeholder={t("numbers_of_deleted_spam_email")}
                                                    component={Input}
                                                />
                                            </FormItem>
                                            <FormItem
                                                label={t("impact.eco_search_engine_hour")}
                                                invalid={errors.eco_search_engine_hour && touched.eco_search_engine_hour}
                                                errorMessage={errors.eco_search_engine_hour}
                                            >
                                                <Field
                                                    type="text"
                                                    autoComplete="off"
                                                    name="eco_search_engine_hour"
                                                    placeholder={t("eco_search_engine_hour_usages")}
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
