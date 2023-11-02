import React from "react";
import {
  CommonInfoViewSection,
  ContentAttrViewSection,
  ContentSlotSection,
  FormTitle,
  ReplySection,
  ShowView,
  SimpleShowLayout,
  SubContentTaskListSection,
  TabbedShowLayout,
  useContentContext,
} from "@components";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Typography } from "antd";
import { Stack, useTheme } from "@mui/material";
import { ContentShowActions } from "./ContentShowActions";
import { useLocaleState, useRecordContext } from "ra-core";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "./PageTitle";

interface Props {
  mode?: string;
  onSubmit?: SubmitHandler<FieldValues>;
}

export const TaskDetailForm = (props: Props) => {
  const { mode = "edit", onSubmit } = props;
  const record = useRecordContext();
  const [locale] = useLocaleState();
  const theme = useTheme();

  const handleSubmit = (data: SubmitHandler<FieldValues>) => {
    onSubmit && onSubmit(data);
  };

  return (
    <ShowView title={<PageTitle />} actions={false} {...props}>
      <SimpleShowLayout sx={{ margin: theme.spacing(1, 0) }}>
        <CommonInfoViewSection />
        <ContentAttrViewSection />
      </SimpleShowLayout>
      <SimpleShowLayout>
        <SubContentTaskListSection
          isHeader={true}
          title="서브 프로젝트/태스크"
        />
      </SimpleShowLayout>
      <SimpleShowLayout>
        <ReplySection />
      </SimpleShowLayout>
    </ShowView>
  );
};
