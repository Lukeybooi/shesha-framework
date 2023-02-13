/* Generated by restful-react */

import React from 'react';
import { Get, GetProps, useGet, UseGetProps, Mutate, MutateProps, useMutate, UseMutateProps } from 'restful-react';
export const SPEC_VERSION = 'v1';
export interface ClickatellSettingDto {
  clickatellHost?: string | null;
  clickatellApiUsername?: string | null;
  clickatellApiPassword?: string | null;
  clickatellApiId?: string | null;
  singleMessageMaxLength?: number;
  messagePartLength?: number;
  useProxy?: boolean;
  webProxyAddress?: string | null;
  useDefaultProxyCredentials?: boolean;
  webProxyUsername?: string | null;
  webProxyPassword?: string | null;
}

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

export interface BooleanAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: boolean;
}

export interface AjaxResponseBase {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
}

export interface ClickatellSettingDtoAjaxResponse {
  targetUrl?: string | null;
  success?: boolean;
  error?: ErrorInfo;
  unAuthorizedRequest?: boolean;
  __abp?: boolean;
  result?: ClickatellSettingDto;
}

export interface ClickatellUpdateSettingsQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ClickatellUpdateSettingsProps = Omit<
  MutateProps<BooleanAjaxResponse, AjaxResponseBase, ClickatellUpdateSettingsQueryParams, ClickatellSettingDto, void>,
  'path' | 'verb'
>;

export const ClickatellUpdateSettings = (props: ClickatellUpdateSettingsProps) => (
  <Mutate<BooleanAjaxResponse, AjaxResponseBase, ClickatellUpdateSettingsQueryParams, ClickatellSettingDto, void>
    verb="PUT"
    path={`/api/Clickatell/Settings`}
    {...props}
  />
);

export type UseClickatellUpdateSettingsProps = Omit<
  UseMutateProps<
    BooleanAjaxResponse,
    AjaxResponseBase,
    ClickatellUpdateSettingsQueryParams,
    ClickatellSettingDto,
    void
  >,
  'path' | 'verb'
>;

export const useClickatellUpdateSettings = (props: UseClickatellUpdateSettingsProps) =>
  useMutate<BooleanAjaxResponse, AjaxResponseBase, ClickatellUpdateSettingsQueryParams, ClickatellSettingDto, void>(
    'PUT',
    `/api/Clickatell/Settings`,
    props
  );

export interface ClickatellGetSettingsQueryParams {
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ClickatellGetSettingsProps = Omit<
  GetProps<ClickatellSettingDtoAjaxResponse, AjaxResponseBase, ClickatellGetSettingsQueryParams, void>,
  'path'
>;

export const ClickatellGetSettings = (props: ClickatellGetSettingsProps) => (
  <Get<ClickatellSettingDtoAjaxResponse, AjaxResponseBase, ClickatellGetSettingsQueryParams, void>
    path={`/api/Clickatell/Settings`}
    {...props}
  />
);

export type UseClickatellGetSettingsProps = Omit<
  UseGetProps<ClickatellSettingDtoAjaxResponse, AjaxResponseBase, ClickatellGetSettingsQueryParams, void>,
  'path'
>;

export const useClickatellGetSettings = (props: UseClickatellGetSettingsProps) =>
  useGet<ClickatellSettingDtoAjaxResponse, AjaxResponseBase, ClickatellGetSettingsQueryParams, void>(
    `/api/Clickatell/Settings`,
    props
  );

export interface ClickatellTestSmsQueryParams {
  mobileNumber?: string | null;
  body?: string | null;
  /**
   * The requested API version
   */
  'api-version'?: string;
}

export type ClickatellTestSmsProps = Omit<
  MutateProps<void, unknown, ClickatellTestSmsQueryParams, void, void>,
  'path' | 'verb'
>;

export const ClickatellTestSms = (props: ClickatellTestSmsProps) => (
  <Mutate<void, unknown, ClickatellTestSmsQueryParams, void, void>
    verb="POST"
    path={`/api/services/SheshaClickatell/Clickatell/TestSms`}
    {...props}
  />
);

export type UseClickatellTestSmsProps = Omit<
  UseMutateProps<void, unknown, ClickatellTestSmsQueryParams, void, void>,
  'path' | 'verb'
>;

export const useClickatellTestSms = (props: UseClickatellTestSmsProps) =>
  useMutate<void, unknown, ClickatellTestSmsQueryParams, void, void>(
    'POST',
    `/api/services/SheshaClickatell/Clickatell/TestSms`,
    props
  );
