class GroupsController < ApplicationController
      else
        render :edit
      end
    end


  private
  def group_params
    params.require(:group).permit(:name, {:user_ids => []})
  end

  def set_group
    @group = Group.find(params[:id])
  end

end
