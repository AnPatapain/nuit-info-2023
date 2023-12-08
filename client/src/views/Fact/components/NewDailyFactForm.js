import React, { useState, useEffect } from 'react'
import {
    Input,
    Button,
    Select,
    Avatar,
    FormItem,
    FormContainer,
    hooks,
    Upload,
    toast,
    Notification
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
    title: Yup.string().min(3, t("fact.too_short")).required(t("fact.title_required")),
    fact: Yup.string().min(3, t("fact.too_short")).required(t("fact.fact_required")),
})
const NewIdeaForm = () => {
    const onSetFormFile = (form, field, files) => {
        if (files && files[0]) {
            form.setFieldValue(field.name, URL.createObjectURL(files[0]))
        }
    }
    const beforeUpload = (files, fileList) => {
        let valid = true
        const maxUpload = 1
        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 1000000 // 1mb

        if (fileList.length >= maxUpload) {
            return t(`profile.you_can_only_upload`, { maxFile: maxUpload })
        }

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = t('profile.please_upload_an_image_file')
                }

                if (f.size >= maxFileSize) {
                    valid = t(`profile.upload_image_cannot_more_than`, {
                        maxFileSize: maxFileSize / 1000,
                    })
                }
            }
        }

        return valid
    }
    const onSubmit = async (formValue, setSubmitting) => {
        setSubmitting(true)
        const { title, fact, image } = formValue
        const formData = new FormData();
        formData.append('title', title);
        formData.append('fact', fact);



        try {
            const imageFile = await blobUrlToFile(image, "image");
            if (imageFile instanceof File) {
                formData.append('image', imageFile);
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const res = await apiCreateNewDailyFact(formData);
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
        <Formik
            initialValues={{
                title: '',
                fact: '',
                image: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onSubmit(values, setSubmitting);
            }}
        >
            {({ touched, errors, values, isSubmitting }) => {
                const validatorProps = { touched, errors }
                return (
                <Form>
                    <FormContainer className="">
                        <FormRow name="image" label={t('fact.image')} {...validatorProps}>
                            <Field name="image">
                                {({ field, form }) => {
                                    const imageProps = field.value
                                        ? { src: field.value }
                                        : {};
                                    return (
                                        <Upload
                                            accept="image/*"
                                            beforeUpload={beforeUpload}
                                            className="cursor-pointer"
                                            onChange={(files) => onSetFormFile(form, field, files)}
                                            onFileRemove={(files) => onSetFormFile(form, field, files)}
                                            showList={false}
                                            uploadLimit={1}
                                        >
                                            <Avatar
                                                className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                size={100}
                                                shape="square"
                                                icon={<BsFillImageFill />}
                                                {...imageProps}
                                            />  
                                        </Upload>
                                    );
                                }}
                            </Field>
                        </FormRow>
                        <FormItem
                            label={t("fact.title")}
                            invalid={errors.title && touched.title}
                            errorMessage={errors.title}
                        >
                            <Field
                                type="text"
                                autoComplete="off"
                                name="title"
                                placeholder={t("fact.enter_fact")}
                                component={Input}
                            />
                        </FormItem>
                        <FormItem
                            label={t("fact.fact_description")}
                            invalid={errors.fact && touched.fact}
                            errorMessage={errors.fact}
                        >
                            <Field
                                as="textarea"
                                type="text"
                                autoComplete="off"
                                name="fact"
                                placeholder={t("fact.fact_description")}
                                component={Input}
                            />
                        </FormItem>
                        <Button block variant="solid" type="submit" loading={isSubmitting}>
                            {isSubmitting ? t("actions.submitting") : t("actions.submit")}
                        </Button>
                    </FormContainer>
                </Form>
            )}}
        </Formik>
    )
}

export default NewIdeaForm
