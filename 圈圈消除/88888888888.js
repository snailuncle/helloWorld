//接下来用到的是DFS(深度优先搜索)对两个点进行判断能不能消除
function panduan(nowx,nowy,tj,father)
{
    var i;
    if(tj>2) return;
    if(nowx==twopic[1].x&&nowy==twopic[1].y&&tj<=2)
    {
        jieguo=1;
        return;
    }
    for(i=0;i<4;i++)
    {
        var xxx=nowx+direct[i][0];
        var yyy=nowy+direct[i][1];
        if(xxx>=0&&xxx<totcol&&yyy>=0&&yyy<totrow)
        {
            if((flag[xxx][yyy]==0&&mapp[xxx][yyy]==0)||(xxx==twopic[1].x&&yyy==twopic[1].y))
            {
                if(i%2==father%2||father==-1)
                {
                    flag[xxx][yyy]=1;
                    panduan(xxx,yyy,tj,i);
                    flag[xxx][yyy]=0;
                }
                else
                {
                    flag[xxx][yyy]=1;
                    panduan(xxx,yyy,tj+1,i);
                    flag[xxx][yyy]=0;
                }
            }
        }
    }
}
