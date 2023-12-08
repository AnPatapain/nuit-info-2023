import React, { useEffect, useState } from 'react'
import {
    Input,
    Avatar,
    Upload,
    Button,
    Select,
    Switcher,
    Notification,
    toast,
    FormContainer,
    Badge,
} from 'components/ui'
import FormDesription from './components/FormDesription'
import FormRow from './components/FormRow'
import { Field, Form, Formik } from 'formik'
import {
    HiOutlineUserCircle,
    HiOutlineMail,
    HiOutlineUser,
} from 'react-icons/hi'
import { FaGithub, FaStackOverflow } from "react-icons/fa";
import * as Yup from 'yup'
import { apiUpdateProfile, apiCreateProfile, apiGetProfile } from 'services/ProfileService'
import { getProfile } from 'store/profile/profileSlice'
import blobUrlToFile from 'utils/blobUrlToFile'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { t } from 'i18next'
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, 'Too Short!')
        .max(12, 'Too Long!')
        .required('Name Required'),
    github: Yup.string(),
    email: Yup.string().email('Invalid email').required('Email Required'),
    image: Yup.string(),
    techSkills: Yup.array().of(Yup.string()).max(10, 'Too many skills! max 10'),
})
const RenderInput = ({ field, form, ...props }) => {
    const { name } = field;
    const value = form.values[name];
    const [inputValue, setInputValue] = useState('');

    const handleAddOption = () => {
        if (inputValue && !value.includes(inputValue) || !(Array.isArray(value) && value?.length < 10)) {
            const newValue = [...value, inputValue];
            form.setFieldValue(name, newValue);
            setInputValue('');
        }
    };

    const handleRemoveOption = (option) => {
        const newValue = value.filter((item) => item !== option);
        form.setFieldValue(name, newValue);
    };

    return (
        <div className=''>
            <div className='flex items-center gap-2 my-2 overflow-x-auto scroll-mb-4'>
                {Array.isArray(value) && value.map((option, index) => (
                    <div key={index} className="flex items-center justify-between gap-2">
                        <span className='bg-gray-300 px-2 rounded-md text-gray-700'>{option}</span>
                        <Button size="xs" variant="solid" type="button" onClick={() => handleRemoveOption(option)} className="!bg-red-500">
                            {t('actions.remove')}
                        </Button>
                    </div>
                ))}
            </div>
            <div className='flex items-center gap-2 my-2'>
                <Input
                    {...field}
                    {...props}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddOption();
                        }
                    }}
                />
                <Button type="button" variant="solid" onClick={handleAddOption}>{t('actions.add')}</Button>
            </div>

        </div>
    );
};
const Profile = ({ data }) => {
    const dispatch = useDispatch();
    const {
        name,
        github,
        image,
        techSkills,
        _id,
    } = useSelector((state) => state.profile)
    const { email } = useSelector((state) => state.auth.user)
    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch])
    const [isImageChanged, setIsImageChanged] = useState(false); 
    const isCreateState = !_id;
    const onSetFormFile = (form, field, files) => {
        if (files && files[0]) {
            form.setFieldValue(field.name, URL.createObjectURL(files[0]))
            setIsImageChanged(true);
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
                        maxFileSize : maxFileSize / 1000,
                    })
                }
            }
        }

        return valid
    }
    const onFormSubmit = async (values, setSubmitting) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('github', values.github);
        formData.append('techSkills', values.techSkills);

        try {
            const imageFile = await blobUrlToFile(values.image, "avatar");
            if (imageFile instanceof File && isImageChanged) {
                formData.append('image', imageFile);
            }
        } catch (error) {
            console.log(error);
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        try {
            let res;
            if (isCreateState) {
                res = await apiCreateProfile(formData);
            } else {
                res = await apiUpdateProfile(formData);
            }
            if (res.status === 201 || res.status === 200) {
                dispatch(getProfile());
                toast.push(<Notification title={t(isCreateState ? 'profile.profile_created' : 'profile.profile_updated')} type="success" />, {
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
                name: name || '',
                email: email || '',
                github: github || '',
                image: image || '',
                techSkills: techSkills || [],
            }}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                onFormSubmit(values, setSubmitting)
            }}
        >
            {({ values, touched, errors, isSubmitting, resetForm }) => {
                const validatorProps = { touched, errors }
                return (
                    <Form className='max-w-[700px] mx-auto'>
                        <FormContainer>
                            <FormDesription
                                title={t('profile.personal_information')}
                                desc={t('profile.basic_info_description')}
                            />
                            <FormRow
                                name="avatar"
                                label={t('profile.avatar')}
                                {...validatorProps}
                            >
                                <Field name="image">
                                    {({ field, form }) => {
                                        const avatarProps = field.value
                                            ? { src: field.value }
                                            : {}
                                        return (
                                            <Upload
                                                accept="image/*"
                                                beforeUpload={beforeUpload}
                                                className="cursor-pointer"
                                                onChange={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                onFileRemove={(files) =>
                                                    onSetFormFile(
                                                        form,
                                                        field,
                                                        files
                                                    )
                                                }
                                                showList={false}
                                                uploadLimit={1}
                                            >
                                                <Avatar
                                                    className="border-2 border-white dark:border-gray-800 shadow-lg"
                                                    size={60}
                                                    shape="circle"
                                                    icon={<HiOutlineUser />}
                                                    {...avatarProps}
                                                />
                                            </Upload>
                                        )
                                    }}
                                </Field>
                            </FormRow>
                            <FormRow
                                name="name"
                                label={t('profile.name')}
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="name"
                                    placeholder={t('profile.name')}
                                    component={Input}
                                    prefix={
                                        <HiOutlineUserCircle className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="email"
                                label={t('profile.email')}

                                {...validatorProps}
                            >
                                <Field
                                    type="email"
                                    disabled
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
                                    component={Input}
                                    prefix={
                                        <HiOutlineMail className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="github"
                                label="Github"
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="github"
                                    placeholder="Github"
                                    component={Input}
                                    prefix={
                                        <FaGithub className="text-xl" />
                                    }
                                />
                            </FormRow>
                            <FormRow
                                name="techSkills"
                                label={<div className='flex items-center gap-2'><FaStackOverflow /><span>Tech stack</span></div>}
                                {...validatorProps}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="techSkills"
                                    placeholder="Add tech skill"
                                    component={RenderInput}
                                />
                            </FormRow>
                            <div className="mt-4 ltr:text-right">
                                <Button
                                    className="ltr:mr-2 rtl:ml-2"
                                    type="button"
                                    onClick={resetForm}
                                >
                                    {t('actions.reset')}
                                </Button>
                                <Button
                                    variant="solid"
                                    loading={isSubmitting}
                                    type="submit"
                                >
                                    {isSubmitting ? 
                                        (isCreateState ? t('actions.creating') : t('actions.updating')) : 
                                        (isCreateState ? t('actions.create') : t('actions.update'))}
                                </Button>
                            </div>
                        </FormContainer>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default Profile
