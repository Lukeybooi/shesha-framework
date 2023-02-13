/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = 'v1';
export interface ValidationErrorInfo {
  message?: string | null;
  members?: string[] | null;
}

export interface ErrorInfo {
  code?: number;
  message?: string | null;
  details?: string | null;
  validationErrors?: ValidationErrorInfo[] | null;
}

export interface GuidAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: string;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface StringAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: string | null;
}

export interface ReferenceListItemValueDto {
  item?: string | null;
  itemValue?: number | null;
}

export interface ScheduledJobDto {
  id?: string;
  jobName?: string | null;
  jobNamespace?: string | null;
  jobDescription?: string | null;
  jobStatus?: ReferenceListItemValueDto;
  startupMode?: ReferenceListItemValueDto;
}

export interface ScheduledJobDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ScheduledJobDto;
}

export interface ScheduledJobDtoPagedResultDto {
  items?: ScheduledJobDto[] | null;
  totalCount?: number;
}

export interface ScheduledJobDtoPagedResultDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ScheduledJobDtoPagedResultDto;
}

export interface ScheduledJobStartJobQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobStartJobProps = Omit<
  MutateProps<GuidAjaxResponse, AjaxResponseBase, ScheduledJobStartJobQueryParams, void, void>,
  'path' | 'verb'
>;

export const ScheduledJobStartJob = (props: ScheduledJobStartJobProps) => (
  <Mutate<GuidAjaxResponse, AjaxResponseBase, ScheduledJobStartJobQueryParams, void, void>
    verb="POST"
    path={`/api/services/Scheduler/ScheduledJob/StartJob`}
    {...props}
  />
);

export type UseScheduledJobStartJobProps = Omit<
  UseMutateProps<GuidAjaxResponse, AjaxResponseBase, ScheduledJobStartJobQueryParams, void, void>,
  'path' | 'verb'
>;

export const useScheduledJobStartJob = (props: UseScheduledJobStartJobProps) =>
  useMutate<GuidAjaxResponse, AjaxResponseBase, ScheduledJobStartJobQueryParams, void, void>(
    'POST',
    `/api/services/Scheduler/ScheduledJob/StartJob`,
    props
  );

export interface ScheduledJobEnqueueAllQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobEnqueueAllProps = Omit<
  MutateProps<void, unknown, ScheduledJobEnqueueAllQueryParams, void, void>,
  'path' | 'verb'
>;

export const ScheduledJobEnqueueAll = (props: ScheduledJobEnqueueAllProps) => (
  <Mutate<void, unknown, ScheduledJobEnqueueAllQueryParams, void, void>
    verb="POST"
    path={`/api/services/Scheduler/ScheduledJob/EnqueueAll`}
    {...props}
  />
);

export type UseScheduledJobEnqueueAllProps = Omit<
  UseMutateProps<void, unknown, ScheduledJobEnqueueAllQueryParams, void, void>,
  'path' | 'verb'
>;

export const useScheduledJobEnqueueAll = (props: UseScheduledJobEnqueueAllProps) =>
  useMutate<void, unknown, ScheduledJobEnqueueAllQueryParams, void, void>(
    'POST',
    `/api/services/Scheduler/ScheduledJob/EnqueueAll`,
    props
  );

export interface ScheduledJobRunTriggerQueryParams {
  triggerId?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobRunTriggerProps = Omit<
  MutateProps<void, unknown, ScheduledJobRunTriggerQueryParams, void, void>,
  'path' | 'verb'
>;

export const ScheduledJobRunTrigger = (props: ScheduledJobRunTriggerProps) => (
  <Mutate<void, unknown, ScheduledJobRunTriggerQueryParams, void, void>
    verb="POST"
    path={`/api/services/Scheduler/ScheduledJob/RunTrigger`}
    {...props}
  />
);

export type UseScheduledJobRunTriggerProps = Omit<
  UseMutateProps<void, unknown, ScheduledJobRunTriggerQueryParams, void, void>,
  'path' | 'verb'
>;

export const useScheduledJobRunTrigger = (props: UseScheduledJobRunTriggerProps) =>
  useMutate<void, unknown, ScheduledJobRunTriggerQueryParams, void, void>(
    'POST',
    `/api/services/Scheduler/ScheduledJob/RunTrigger`,
    props
  );

export interface ScheduledJobBootstrapScheduledJobsQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobBootstrapScheduledJobsProps = Omit<
  MutateProps<StringAjaxResponse, AjaxResponseBase, ScheduledJobBootstrapScheduledJobsQueryParams, void, void>,
  'path' | 'verb'
>;

export const ScheduledJobBootstrapScheduledJobs = (props: ScheduledJobBootstrapScheduledJobsProps) => (
  <Mutate<StringAjaxResponse, AjaxResponseBase, ScheduledJobBootstrapScheduledJobsQueryParams, void, void>
    verb="POST"
    path={`/api/services/Scheduler/ScheduledJob/BootstrapScheduledJobs`}
    {...props}
  />
);

export type UseScheduledJobBootstrapScheduledJobsProps = Omit<
  UseMutateProps<StringAjaxResponse, AjaxResponseBase, ScheduledJobBootstrapScheduledJobsQueryParams, void, void>,
  'path' | 'verb'
>;

export const useScheduledJobBootstrapScheduledJobs = (props: UseScheduledJobBootstrapScheduledJobsProps) =>
  useMutate<StringAjaxResponse, AjaxResponseBase, ScheduledJobBootstrapScheduledJobsQueryParams, void, void>(
    'POST',
    `/api/services/Scheduler/ScheduledJob/BootstrapScheduledJobs`,
    props
  );

export interface ScheduledJobCreateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobCreateProps = Omit<
  MutateProps<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobCreateQueryParams, ScheduledJobDto, void>,
  'path' | 'verb'
>;

export const ScheduledJobCreate = (props: ScheduledJobCreateProps) => (
  <Mutate<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobCreateQueryParams, ScheduledJobDto, void>
    verb="POST"
    path={`/api/services/Scheduler/ScheduledJob/Create`}
    {...props}
  />
);

export type UseScheduledJobCreateProps = Omit<
  UseMutateProps<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobCreateQueryParams, ScheduledJobDto, void>,
  'path' | 'verb'
>;

export const useScheduledJobCreate = (props: UseScheduledJobCreateProps) =>
  useMutate<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobCreateQueryParams, ScheduledJobDto, void>(
    'POST',
    `/api/services/Scheduler/ScheduledJob/Create`,
    props
  );

export interface ScheduledJobUpdateQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobUpdateProps = Omit<
  MutateProps<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobUpdateQueryParams, ScheduledJobDto, void>,
  'path' | 'verb'
>;

export const ScheduledJobUpdate = (props: ScheduledJobUpdateProps) => (
  <Mutate<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobUpdateQueryParams, ScheduledJobDto, void>
    verb="PUT"
    path={`/api/services/Scheduler/ScheduledJob/Update`}
    {...props}
  />
);

export type UseScheduledJobUpdateProps = Omit<
  UseMutateProps<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobUpdateQueryParams, ScheduledJobDto, void>,
  'path' | 'verb'
>;

export const useScheduledJobUpdate = (props: UseScheduledJobUpdateProps) =>
  useMutate<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobUpdateQueryParams, ScheduledJobDto, void>(
    'PUT',
    `/api/services/Scheduler/ScheduledJob/Update`,
    props
  );

export interface ScheduledJobDeleteQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobDeleteProps = Omit<
  MutateProps<void, unknown, ScheduledJobDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const ScheduledJobDelete = (props: ScheduledJobDeleteProps) => (
  <Mutate<void, unknown, ScheduledJobDeleteQueryParams, void, void>
    verb="DELETE"
    path={`/api/services/Scheduler/ScheduledJob/Delete`}
    {...props}
  />
);

export type UseScheduledJobDeleteProps = Omit<
  UseMutateProps<void, unknown, ScheduledJobDeleteQueryParams, void, void>,
  'path' | 'verb'
>;

export const useScheduledJobDelete = (props: UseScheduledJobDeleteProps) =>
  useMutate<void, unknown, ScheduledJobDeleteQueryParams, void, void>(
    'DELETE',
    `/api/services/Scheduler/ScheduledJob/Delete`,
    { ...props }
  );

export interface ScheduledJobGetQueryParams {
  id?: string;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobGetProps = Omit<
  GetProps<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetQueryParams, void>,
  'path'
>;

export const ScheduledJobGet = (props: ScheduledJobGetProps) => (
  <Get<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetQueryParams, void>
    path={`/api/services/Scheduler/ScheduledJob/Get`}
    {...props}
  />
);

export type UseScheduledJobGetProps = Omit<
  UseGetProps<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetQueryParams, void>,
  'path'
>;

export const useScheduledJobGet = (props: UseScheduledJobGetProps) =>
  useGet<ScheduledJobDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetQueryParams, void>(
    `/api/services/Scheduler/ScheduledJob/Get`,
    props
  );

export interface ScheduledJobGetAllQueryParams {
  sorting?: string | null;
  skipCount?: number;
  maxResultCount?: number;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ScheduledJobGetAllProps = Omit<
  GetProps<ScheduledJobDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetAllQueryParams, void>,
  'path'
>;

export const ScheduledJobGetAll = (props: ScheduledJobGetAllProps) => (
  <Get<ScheduledJobDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetAllQueryParams, void>
    path={`/api/services/Scheduler/ScheduledJob/GetAll`}
    {...props}
  />
);

export type UseScheduledJobGetAllProps = Omit<
  UseGetProps<ScheduledJobDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetAllQueryParams, void>,
  'path'
>;

export const useScheduledJobGetAll = (props: UseScheduledJobGetAllProps) =>
  useGet<ScheduledJobDtoPagedResultDtoAjaxResponse, AjaxResponseBase, ScheduledJobGetAllQueryParams, void>(
    `/api/services/Scheduler/ScheduledJob/GetAll`,
    props
  );
